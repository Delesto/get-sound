const Router = require('koa-router');
const router = new Router();

//Controllers
const controllers = require('../controllers/index');

router.get('/', controllers.getData);

module.exports = router; 