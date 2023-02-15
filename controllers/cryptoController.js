const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const cryptoService = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/errorUtils');
const { paymentMethods } = require('../constants');



router.get('/catalog', async (req, res) => {

    const crypto = await cryptoService.getAll();

    res.render('crypto/catalog', { crypto });

});


router.get('/:cryptoId/details', async (req, res) => {

    const crypto = await cryptoService.getOne(req.params.cryptoId);

    const isOwner = crypto.owner == req.user?._id;

    const isBuyer = crypto.buyers?.some(id => id == req.user?._id);

    res.render('crypto/details', { crypto, isOwner, isBuyer });

});

router.get('/:cryptoId/buy', isAuth, async (req, res) => {

    await cryptoService.buy(req.user._id, req.params.cryptoId);

    res.redirect(`/crypto/${req.params.cryptoId}/details`)

});


router.get('/:cryptoId/edit', isAuth, async (req, res) => {

    const crypto = await cryptoService.getOne(req.params.cryptoId);
    const payment = Object.keys(paymentMethods).map(key => ({ 
        value: key, 
        label: paymentMethods[key],
        isSelected: crypto.payment == key,
    }));

    res.render('crypto/edit', { crypto, payment });

});

router.post('/:cryptoId/edit', isAuth, async (req, res) => {
    const { name, image, price, description, payment } = req.body;

    try {
        await cryptoService.edit(req.params.cryptoId, { name, image, price, description, payment });
    } catch (error) {

        const crypto = await cryptoService.getOne(req.params.cryptoId);
        return res.status(404).render('crypto/edit', { crypto: crypto, error: getErrorMessage(error) });
    }

    res.redirect(`/crypto/${req.params.cryptoId}/details`)

});

router.get('/:cryptoId/delete', isAuth, async (req, res) => {

    try{
        await cryptoService.delete(req.params.cryptoId);

    }catch(error){
        res.status(404).redirect('home/404')
    }
    res.redirect('/crypto/catalog')

});


router.get('/create', isAuth, (req, res) => {


    res.render('crypto/create');
});

router.post('/create', isAuth, async (req, res) => {
    const { name, image, price, description, payment } = req.body;
    const userId = req.user._id;

    try {
        await cryptoService.create(userId, { name, image, price, description, payment });

        res.redirect('/crypto/catalog');

    } catch (error) {
        return res.status(404).render('crypto/create', { error: getErrorMessage(error) });
    }

});


module.exports = router;