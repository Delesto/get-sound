const fs = require('fs');
const { promisify } = require('util');
const filelogs = require('../filelogs'); 
const unlink = promisify(fs.unlink);

async function cleaner() {
    try {
        for(let item of filelogs) {
            if(item.rTime > Date.now()) {
                await unlink(item.path);
                return true;
            }
        }
    } catch(err) {
        return err;
    }
}

module.exports = cleaner; 