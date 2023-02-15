const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const cryptoController = require('./controllers/cryptoContoller');


router.use(homeController);
router.use(authController);
router.use('/crypto',cryptoController);

module.exports = router;