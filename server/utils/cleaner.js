const fs = require('fs');
const rimraf = require('rimraf');
const { promisify } = require('util');
const filelogs = require('../filelogs');
const write = promisify(fs.writeFile);
const remove = promisify(rimraf);

module.exports = function cleaner() {
    return async function (ctx, next) {
        await next();
        try {
            if (filelogs.length) {
                const modified = filelogs.filter(file => file.rTime > Date.now());
                filelogs.forEach(async file => file.rTime < Date.now() && await remove(file.path));
                await write('filelogs.json', JSON.stringify(modified));
            }
        } catch (err) {
            throw err;
        }
    }
}