//Redis
const redis = require('../models/inedx');

module.exports = {
    'getData': async (ctx, next) => {
        ctx.body = await redis.getAsync('Data');
    }
}