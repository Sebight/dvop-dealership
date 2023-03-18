const express = require('express');
const router = express.Router();

const exampleController = require('../controllers/example/example');
const carController = require('../controllers/car/car');
const tokenMiddleware = require('../middlewares/token');

router.use(async (req, res, next) => {
    if (await tokenMiddleware.isTokenValid(req.headers.token)) {
        next();
    } else {
        res.status(401).send('401');
    }
});

router.get('/', (req, res) => res.status(404).send('404'));

// Car
router.get('/car', carController.getCars)
router.get('/car/:id', carController.getCar)
router.post('/car', carController.postCar)
router.put('/car/:id', carController.putCar)

module.exports = router;