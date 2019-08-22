const doAsync = require('doasync');
const YoutubeMp3Downloader = require('youtube-mp3-downloader');
const path = require('path');

module.exports = {
    'convert': async (ctx) => {
        const body = JSON.parse(ctx.request.rawBody);
        if(body.url) {
            if(body.url.match(/youtube.com\/watch/)) {
                const url = new URL(body.url);
                if(url.searchParams.get('v')) {
                    const video = new YoutubeMp3Downloader({
                        "ffmpegPath": "/usr/bin/ffmpeg",
                        "outputPath": path.resolve(__dirname, '../uploads'),
                        "youtubeVideoQuality": "highest",
                        "queueParallelism": 2,
                        "progressTimeout": 2000
                    });

                    video.download(url.searchParams.get('v'));

                    const data = await doAsync(video).on('finished');
                    ctx.body = data;

                } else {
                    ctx.body = 'You must specify video id';
                }
            } else {
                ctx.body = 'Incorrect url';
            } 
        } else {
            ctx.body = 'Please, send url with request';
        }
    }
}