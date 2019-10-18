const fs = require('fs');
const Ffmpeg = require('ffmpeg');
const ytdl = require('ytdl-core');
const { promisify } = require('util');
const setPath = require('../utils/setPath');
const filelogger = require('../utils/filelogger');

const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.exists);

async function getInfo(ctx) {
    const body = JSON.parse(ctx.request.rawBody);
    if(body.url) {
        if(body.url.match(/youtube.com\/watch/)) {
            const url = new URL(body.url);
            if(url.searchParams.get('v')) {
                try {
                    const getInfo = promisify(ytdl.getInfo);
                    const info = await getInfo(url.searchParams.get('v'));
                    return info;
                } catch(err) {
                    ctx.throw(500);
                }           
            } else {
                ctx.throw(400, 'Incorrect url specified');
            }
        } else {
            ctx.throw(400, 'Incorrect url specified');
        }
    } else {
        ctx.throw(400, '\'Url\' parameter not specified');
    }
}

module.exports = {
    'getInfo': async (ctx) => {
        const info = await getInfo(ctx);
        ctx.body = info;
    },
    'convert': async (ctx) => {
        function download(url, path) {
            return new Promise((res, rej) => {
                const stream = ytdl(url)
                    .pipe(fs.createWriteStream(path));
                    stream.on('close', () => {
                        res();
                    });
                    stream.on('error', (err) => {
                        rej(err);
                    });
            });
        }

        const info = await getInfo(ctx);
        const pattern = /[`~!@#$%^&*()_|+\-=?;:'",.<>\s\{\}\[\]\\\/]/g;
        const name = info.player_response.videoDetails.title.toString().replace(pattern, '');
        
        try {
            if(!await exists(setPath('../uploads'))) {
                await mkdir(setPath('../uploads'));
            }

            if(!await exists(setPath(`../uploads/${name}`))) {
                await mkdir(setPath(`../uploads/${name}`));
                await download(info.video_url, setPath(`../uploads/${name}/${name}.avi`));
                const process = await new Ffmpeg(setPath(`../uploads/${name}/${name}.avi`));
                const extract = promisify(process.fnExtractSoundToMP3.bind(process));
                await extract(setPath(`../uploads/${name}/${name}.mp3`));
            }
            
            const result = JSON.stringify({
                name,
                pathToMp3: setPath(`../uploads/${name}/${name}.mp3`),
                pathToAvi: setPath(`../uploads/${name}/${name}.avi`)
            });
            await filelogger(name, setPath(`../uploads/${name}`));
            ctx.body = result;
        } catch (err) {
            ctx.throw(400, err);
        }
    }
}