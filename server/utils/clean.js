const fs = require('fs');
const { promisify } = require('util');

async function clean(path) {
    try {
        const unlink = promisify(fs.unlink);
        await unlink(path);
        return true;
    } catch(err) {
        return err;
    }
}

module.exports = clean; 