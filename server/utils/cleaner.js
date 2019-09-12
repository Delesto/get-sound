const fs = require('fs');
const { promisify } = require('util');
const filelogs = require('../filelogs'); 
const unlink = promisify(fs.unlink);

async function cleaner() {
    try {
        filelogs.forEach(file => {
            
        });
    } catch(err) {
        return err;
    }
}

module.exports = cleaner; 