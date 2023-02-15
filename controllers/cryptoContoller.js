const router = require('express').Router();

const  { isAuth } = require('../middlewares/authMiddleware');
const cryptoService = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/errorUtils');



router.get('/catalog', async (req, res) => {

    const crypto = await cryptoService.getAll();

    res.render('crypto/catalog', {crypto});

});


router.get('/:cryptoId/details',  async (req, res) => {

    const crypto = await cryptoService.getOne(req.params.cryptoId);

    const isOwner = crypto.owner == req.user?._id;
    
    let isBuyer;

    if (crypto.buyers) {

        isBuyer = crypto.buyers.some( id => id == req.user?._id);
    }
    

    res.render('crypto/details', { crypto, isOwner, isBuyer });

});

router.get('/:cryptoId/buy', isAuth, async (req, res) =>{

    await cryptoService.buy(req.user._id, req.params.cryptoId);
    
    res.redirect( `/crypto/${req.params.cryptoId}/details`)

});

router.get('/create', isAuth, (req, res)=> {
    res.render('crypto/create');
});

router.post('/create', isAuth, async (req, res)=> {
    const {name, image, price, description, payment } = req.body;
    const userId = req.user._id;

    try {
        await cryptoService.create(userId, {name, image, price, description, payment });

        res.redirect('/crypto/catalog');

    } catch (error){
        return res.status(404).render('crypto/create', { error: getErrorMessage(error) });
    }

});


module.exports = router;