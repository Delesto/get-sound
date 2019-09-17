function hours(h) {
    return new Date().setTime(new Date().getTime() + (h * 60 * 60 * 1000));
}

function minutes(m) {
    return new Date().setTime(new Date().getTime() + (m * 60 * 1000))
}

function seconds(s) {
    return new Date().setTime(new Date().getTime() + (s * 1000))
}

module.exports = { hours, minutes, seconds }