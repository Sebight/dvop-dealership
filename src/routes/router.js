const express = require('express');
const router = express.Router();

const exampleController = require('../controllers/example/example');
const tokenMiddleware = require('../middlewares/token');

router.use(async (req, res, next) => {
    if (await tokenMiddleware.isTokenValid(req.headers.token)) {
        next();
    } else {
        res.status(401).send('401');
    }
});

router.get('/', (req, res) => res.status(404).send('404'));
router.get('/example', exampleController.getExample);
router.post('/example', exampleController.postExample);

module.exports = router;