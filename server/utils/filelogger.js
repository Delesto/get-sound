const filelogs = require('../filelogs'); 

module.exports = function(name, path) {
    function setHours(h) {
        return new Date().setTime(new Date().getTime() + (h * 60 * 60 * 1000));
    }

    function setSeconds(s) {
        return new Date().setTime(new Date().getTime() + (s * 1000))
    }

    filelogs.add({
        name,
        path,
        rTime: setSeconds(20)
    });
    console.log(filelogs.values());
}