const express = require('express');
const router = express.Router();

const carController = require('../controllers/car/car');
const developerController = require('../controllers/developer/developer');
const orderController = require('../controllers/order/order');
const customerController = require('../controllers/customer/customer');

const tokenMiddleware = require('../middlewares/token');
const priorityMiddleware = require("../middlewares/priority");
const {Actions} = require("../middlewares/priority");

router.use(async (req, res, next) => {
    if (await tokenMiddleware.isTokenValid(req.headers.token)) {
        next();
    } else {
        res.status(401).send('401');
    }
});

router.get('/', (req, res) => res.status(404).send('404'));

// Car
router.get('/car', priorityMiddleware.canPerform(Actions.GET_CARS), carController.getCars);
router.post('/car', priorityMiddleware.canPerform(Actions.NEW_CAR), carController.postCar);
router.get('/car/:id', priorityMiddleware.canPerform(Actions.GET_CAR), carController.getCar);
router.put('/car/:id', priorityMiddleware.canPerform(Actions.UPDATE_CAR), carController.putCar);
router.delete('/car/:id', priorityMiddleware.canPerform(Actions.DELETE_CAR), carController.deleteCar);

// Developer
router.get('/developer', priorityMiddleware.canPerform(Actions.GET_DEVELOPERS), developerController.getDevelopers);
router.post('/developer', priorityMiddleware.canPerform(Actions.NEW_DEVELOPER), developerController.postDeveloper);
router.get('/developer/:token', priorityMiddleware.canPerform(Actions.GET_DEVELOPER), developerController.getDeveloper);
router.put('/developer/:token', priorityMiddleware.canPerform(Actions.UPDATE_DEVELOPER),developerController.putDeveloper);
router.delete('/developer/:token', priorityMiddleware.canPerform(Actions.DELETE_DEVELOPER), developerController.deleteDeveloper);

// Order
router.get('/order', priorityMiddleware.canPerform(Actions.GET_ORDERS), orderController.getOrders);
router.post('/order', priorityMiddleware.canPerform(Actions.NEW_ORDER), orderController.postOrder);
router.get('/order/:id', priorityMiddleware.canPerform(Actions.GET_ORDER), orderController.getOrder);
router.put('/order/:id', priorityMiddleware.canPerform(Actions.UPDATE_ORDER), orderController.putOrder);
router.delete('/order/:id', priorityMiddleware.canPerform(Actions.DELETE_ORDER), orderController.deleteOrder);

// Customer
router.get('/customer', priorityMiddleware.canPerform(Actions.GET_CUSTOMERS), customerController.getCustomers);
router.post('/customer', priorityMiddleware.canPerform(Actions.NEW_CUSTOMER), customerController.postCustomer);
router.get('/customer/:id', priorityMiddleware.canPerform(Actions.GET_CUSTOMER), customerController.getCustomer);
router.put('/customer/:id', priorityMiddleware.canPerform(Actions.UPDATE_CUSTOMER), customerController.putCustomer);
router.delete('/customer/:id', priorityMiddleware.canPerform(Actions.DELETE_CUSTOMER), customerController.deleteCustomer);

module.exports = router;