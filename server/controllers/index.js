const fs = require('fs');
const path = require('path');
const Ffmpeg = require('ffmpeg');
const ytdl = require('ytdl-core');
const { promisify } = require('util');
const redis = require('../models/index');
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
        function setPath(name, format) {
            if(arguments.length > 1 && format) {
                return path.resolve(__dirname, `../uploads/${name}/${name}.${format}`);
            } else {
                return path.resolve(__dirname, `../uploads/${name}`);
            }
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
            if(!await exists(setPath(name))) {
                await mkdir(setPath(name));
                await download(info.video_url, setPath(name, 'avi'));
                const process = await new Ffmpeg(setPath(name, 'avi'));
                const extract = promisify(process.fnExtractSoundToMP3.bind(process));
                await extract(setPath(name, 'mp3'));
                filelogger(name, setPath(name));
            }
            
            const result = JSON.stringify({
                name,
                pathToMp3: setPath(name, 'mp3'),
                pathToAvi: setPath(name, 'avi')
            });
            
            ctx.body = result;
        } catch (err) {
            ctx.throw(400, err);
        }
    }
}