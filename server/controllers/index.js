const fs = require('fs');
const path = require('path');
const Ffmpeg = require('ffmpeg');
const ytdl = require('ytdl-core');
const { promisify } = require('util');
const redis = require('../models/index');

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
        function setPath(name, format) {
            return path.resolve(__dirname, `../uploads/${name}.${format}`);
        }

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
            await download(info.video_url, setPath(name, 'avi'));
            const process = await new Ffmpeg(setPath(name, 'avi'));
            const extract = promisify(process.fnExtractSoundToMP3.bind(process));
            const result = await extract(setPath(name, 'mp3'));
            ctx.body = result;
        } catch (err) {
            ctx.throw(400, err);
        }
    }
}