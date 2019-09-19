const fs = require('fs');
const { promisify } = require('util');
const setTime = require('../utils/setTime');
const filelogs = require('../filelogs');

const write = promisify(fs.writeFile);

function getDuplicateIndices(array, searchFile) {
    let copyIndices = [];
    array.forEach((file, index) => {
        if(file.name === searchFile.name) {
            copyIndices.push(index);
        }
    });

    return copyIndices;
}

module.exports = async function(name, filePath) {
    const newFile = {
        name,
        path: filePath,
        rTime: setTime.seconds(5)
    }

    try {
        if(filelogs.length) {
            const duplicates = getDuplicateIndices(filelogs, newFile);
            //Delete all erlier repetitions of the same file
            if(duplicates.length) {
                let i = 0;
                while(i < duplicates.length) {
                    filelogs.splice(i > 0 ? duplicates[i] - i : duplicates[i], 1);
                    i++;
                }
            }
            filelogs.push(newFile);
            await write('filelogs.json', JSON.stringify(filelogs));    
        } else {
            const data = [];
            data.push(newFile);
            await write('filelogs.json', JSON.stringify(data));
        }
    } catch(err) {
        throw err;
    }
    
}