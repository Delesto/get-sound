const Router = require('koa-router');
const router = new Router();

//Controllers
const controllers = require('../controllers/index');

router.get('/api/convert', controllers.convert);

module.exports = router; 