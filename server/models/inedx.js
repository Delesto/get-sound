const bluebird = require('bluebird');
const Redis = require('redis');
const env = require('dotenv');

env.config();

bluebird.promisifyAll(Redis.RedisClient.prototype);
bluebird.promisifyAll(Redis.Multi.prototype);

const redis = Redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

redis.on('error', (err) => {
    console.log(err);
});

redis.set('Data', 'There is something');

module.exports = redis;