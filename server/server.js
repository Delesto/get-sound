const Koa = require('koa');
const Router = require('koa-router');
const json = require('koa-json');
const logger = require('koa-logger');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = 'Hey';
});

app.use(json())
    .use(logger())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000, () => {
        console.log(`Server running at port ${3000}`);
    });