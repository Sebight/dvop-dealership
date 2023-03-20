const express = require('express');
const router = express.Router();

const carController = require('../controllers/car/car');
const developerController = require('../controllers/developer/developer');
const orderController = require('../controllers/order/order');
const customerController = require('../controllers/customer/customer');

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
router.get('/car', carController.getCars);
router.post('/car', carController.postCar);
router.get('/car/:id', carController.getCar);
router.put('/car/:id', carController.putCar);
router.delete('/car/:id', carController.deleteCar);

// Developer
router.get('/developer', developerController.getDevelopers);
router.post('/developer', developerController.postDeveloper);
router.get('/developer/:token', developerController.getDeveloper);
router.put('/developer/:token', developerController.putDeveloper);
router.delete('/developer/:token', developerController.deleteDeveloper);

// Order
router.get('/order', orderController.getOrders);
router.post('/order', orderController.postOrder);
router.get('/order/:id', orderController.getOrder);
router.put('/order/:id', orderController.putOrder);
router.delete('/order/:id', orderController.deleteOrder);

// Customer
router.get('/customer', customerController.getCustomers);
router.post('/customer', customerController.postCustomer);
router.get('/customer/:id', customerController.getCustomer);
router.put('/customer/:id', customerController.putCustomer);
router.delete('/customer/:id', customerController.deleteCustomer);

module.exports = router;