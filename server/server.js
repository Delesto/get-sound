const Koa = require('koa');
const json = require('koa-json');
const logger = require('koa-logger');
const env = require('dotenv');

//Routes
const router = require('./routes/index');

env.config();

const app = new Koa();

app.use(json())
    .use(logger())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(process.env.PORT, () => {
        console.log(`Server running at port ${process.env.PORT}`);
    });
