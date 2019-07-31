const Koa = require('koa');
const Router = require('koa-router');
const json = require('koa-json');
const logger = require('koa-logger');
const env = require('dotenv');

env.config();

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = 'Hey';
});

app.use(json())
    .use(logger())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(process.env.PORT, () => {
        console.log(`Server running at port ${process.env.PORT}`);
    });