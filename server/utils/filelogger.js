const fs = require('fs');
const { promisify } = require('util');
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
    function setHours(h) {
        return new Date().setTime(new Date().getTime() + (h * 60 * 60 * 1000));
    }

    function setSeconds(s) {
        return new Date().setTime(new Date().getTime() + (s * 1000))
    }

    const newFile = {
        name,
        path: filePath,
        rTime: setSeconds(10)
    }

    try {
        if(filelogs.length) {
            const duplicates = getDuplicateIndices(filelogs, newFile);
            //Delete all erlier repetitions of the same file
            if(duplicates.length) {
                let i = 0;
                while(i < duplicates.length) {
                    filelogs.splice(duplicates[i > 0 ? i - 1 : i], 1);
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
        console.log(err)
    }
    
}