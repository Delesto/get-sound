const Koa = require('koa');
const env = require('dotenv');
const json = require('koa-json');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');

//Routes
const router = require('./routes/index');

//Cleaner
// const cleaner = require('./utils/cleaner');
// setInterval(async () => {
//     cleaner();
// }, 5000)


env.config();

const app = new Koa();

app.use(json())
    .use(bodyparser())
    .use(logger())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(process.env.PORT, () => {
        console.log(`Server running at port ${process.env.PORT}`);
    });
