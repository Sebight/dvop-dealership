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

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Car management APIs
 */

/**
 * @swagger
 * /car:
 *   get:
 *     tags: [Cars]
 *     summary: Retrieve a list of all cars
 *     description: Returns a JSON array of all cars in the database
 *     responses:
 *       200:
 *         description: An array of car objects
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               make: "Mercedes"
 *               model: "Maybach"
 *               year: 2020
 *               color: "Black"
 *               vin: "12345678901234567"
 *               mileage: 1000
 *               price: 100000
 *               description: "This is a car"
 *               image: ""
 */
router.get('/car', carController.getCars);
/**
 * @swagger
 * /car:
 *   post:
 *     tags: [Cars]
 *     summary: Create a new car
 *     description: Creates a new car object in the database with the specified data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             id: 1
 *             make: "Mercedes"
 *             model: "Maybach"
 *             year: 2020
 *             color: "Black"
 *             vin: "12345678901234567"
 *             mileage: 1000
 *             price: 100000
 *             description: "This is a car"
 *             image: ""
 *     responses:
 *       201:
 *         description: The newly created car object
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               make: "Mercedes"
 *               model: "Maybach"
 *               year: 2020
 *               color: "Black"
 *               vin: "12345678901234567"
 *               mileage: 1000
 *               price: 100000
 *               description: "This is a car"
 *               image: ""
 */
router.post('/car', carController.postCar);
/**
 * @swagger
 * /car/{id}:
 *     get:
 *       tags: [Cars]
 *       summary: Retrieve a single car by ID
 *       description: Returns a JSON object of a car with the specified ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The ID of the car to retrieve
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: The car object with the specified ID
 *           content:
 *             application/json:
 *               example:
 *                 id: 1
 *                 make: "Mercedes"
 *                 model: "Maybach"
 *                 year: 2020
 *                 color: "Black"
 *                 vin: "12345678901234567"
 *                 mileage: 1000
 *                 price: 100000
 *                 description: "This is a car"
 *                 image: ""
 *         404:
 *           description: Car not found with the specified ID
 */
router.get('/car/:id', carController.getCar);
/**
 * @swagger
 * /car/{id}:
 *     put:
 *       tags: [Cars]
 *       summary: Update a single car by ID
 *       description: Updates an existing car object in the database with the specified data
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The ID of the car to update
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               make: "Mercedes"
 *               model: "Maybach"
 *               year: 2020
 *               color: "Black"
 *               vin: "12345678901234567"
 *               mileage: 1000
 *               price: 100000
 *               description: "This is a car"
 *               image: ""
 *       responses:
 *         200:
 *           description: Updated car object
 *           content:
 *             application/json:
 *               example:
 *                 id: 1
 *                 make: "Mercedes"
 *                 model: "Maybach"
 *                 year: 2020
 *                 color: "Black"
 *                 vin: "12345678901234567"
 *                 mileage: 1000
 *                 price: 100000
 *                 description: "This is a car"
 *                 image: ""
 *         404:
 *           description: Car not found with the specified ID
 */
router.put('/car/:id', carController.putCar);
/**
 * @swagger
 * /car/{id}:
 *     delete:
 *       tags: [Cars]
 *       summary: Delete a single car by ID
 *       description: Deletes a car object from the database with the specified ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The ID of the car to delete
 *           schema:
 *             type: string
 *       responses:
 *         204:
 *           description: Car successfully deleted
 *         404:
 *           description: Car not found with the specified ID
 */
router.delete('/car/:id', carController.deleteCar);

/**
 * @swagger
 * tags:
 *   name: Developers
 *   description: Developer management APIs
 */

/**
 * @swagger
 * /developer:
 *   get:
 *     tags: [Developers]
 *     summary: Get all developers
 *     description: Returns a list of all developers.
 *     responses:
 *       200:
 *         description: List of developers
 *         content:
 *           application/json:
 *             example:
 *               name: "John Doe"
 *               email: "example@gmail.com"
 *               token: "1234567890"
 */
router.get('/developer', developerController.getDevelopers);
/**
 * @swagger
 * /developer:
 *   post:
 *     tags: [Developers]
 *     summary: Create a new developer
 *     description: Creates a new developer and returns its details.
 *     requestBody:
 *       description: Developer object to create
 *       required: true
 *       content:
 *         application/json:
 *             example:
 *               name: "John Doe"
 *               email: "example@gmail.com"
 *               token: "1234567890"
 *     responses:
 *       201:
 *         description: Created developer object
 *         content:
 *           application/json:
 *             example:
 *               name: "John Doe"
 *               email: "example@gmail.com"
 *               token: "1234567890"
 *       400:
 *         description: Bad request
 */
router.post('/developer', developerController.postDeveloper);
/**
 * @swagger
 * /developer/{token}:
 *   get:
 *     tags: [Developers]
 *     summary: Get a developer by token
 *     description: Returns the details of a developer specified by its token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Token of the developer to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Developer details
 *         content:
 *           application/json:
 *             example:
 *               name: "John Doe"
 *               email: "example@gmail.com"
 *               token: "1234567890"
 *       404:
 *         description: Developer not found
 */
router.get('/developer/:token', developerController.getDeveloper);
/**
 * @swagger
 * /developer/{token}:
 *   put:
 *     tags: [Developers]
 *     summary: Update a developer by token
 *     description: Updates the details of a developer specified by its token and returns the updated object.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Token of the developer to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Developer object to update
 *       required: true
 *       content:
 *         application/json:
 *             example:
 *               name: "John Doe"
 *               email: "example@gmail.com"
 *               token: "1234567890"
 *     responses:
 *       200:
 *         description: Updated developer object
 *         content:
 *           application/json:
 *             example:
 *               name: "John Doe"
 *               email: "example@gmail.com"
 *               token: "1234567890"
 *       400:
 *         description: Bad request
 *       404:
 *         description: Developer not found
 */
router.put('/developer/:token', developerController.putDeveloper);
/**
 * @swagger
 * /developer/{token}:
 *   delete:
 *     tags: [Developers]
 *     summary: Delete a developer by token
 *     description: Deletes a developer specified by its token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Token of the developer to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Developer not found
 */
router.delete('/developer/:token', developerController.deleteDeveloper);

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs
 */

/**
 * @swagger
 * /order:
 *   get:
 *     tags: [Orders]
 *     summary: Retrieve a list of orders
 *     description: Returns a list of all orders
 *     responses:
 *       200:
 *         description: A list of orders
 */
router.get('/order', orderController.getOrders);
/**
 * @swagger
 * /order:
 *   post:
 *     tags: [Orders]
 *     summary: Create a new order
 *     description: Creates a new order with the provided data
 *     requestBody:
 *       description: Order object to be created
 *       required: true
 *       content:
 *         application/json:
 *             example:
 *               customer_id: "1"
 *     responses:
 *       201:
 *         description: The created order object
 *       400:
 *         description: Invalid request data provided
 */
router.post('/order', orderController.postOrder);
/**
 * @swagger
 * /order/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Retrieve an order by ID
 *     description: Returns an order with the specified ID
 *     requestBody:
 *       description: Order object that returns
 *       required: true
 *       content:
 *         application/json:
 *             example:
 *               customer_id: "1"
 *     responses:
 *       200:
 *         description: The order object with the specified ID
 *       404:
 *         description: Order not found
 */
router.get('/order/:id', orderController.getOrder);
/**
 * @swagger
 * /order/{id}:
 *   put:
 *     tags: [Orders]
 *     summary: Update an order by ID
 *     description: Updates an existing order with the specified ID
 *     requestBody:
 *       description: Order object to be updated
 *       required: true
 *       content:
 *         application/json:
 *             example:
 *               customer_id: "1"
 *     responses:
 *       200:
 *         description: The updated order object
 *       400:
 *         description: Invalid request data provided
 *       404:
 *         description: Order not found
 */
router.put('/order/:id', orderController.putOrder);
/**
 * @swagger
 *
 * /orders/{id}:
 *   delete:
 *     tags: [Orders]
 *     summary: Delete an order by ID
 *     description: Deletes an order with the specified ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the order to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Order not found
 */
router.delete('/order/:id', orderController.deleteOrder);

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management APIs
 */

/**
 * @swagger
 * /customer:
 *   get:
 *     tags: [Customers]
 *     summary: Retrieve a list of all customers
 *     description: Returns a JSON array of all customers in the database
 *     responses:
 *       200:
 *         description: An array of customer objects
 *         content:
 *           application/json:
 *             example:
 *               name: "John Doe"
 *               email: "example@gmail.com"
 */
router.get('/customer', customerController.getCustomers);
/**
 * @swagger
 * /customer:
 *   post:
 *     tags: [Customers]
 *     summary: Create a new customer
 *     description: Creates a new customer object in the database with the specified data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *               name: "John Doe"
 *               email: "example@gmail.com"
 *     responses:
 *       201:
 *         description: The newly created customer object
 *         content:
 *           application/json:
 *             example:
 *               name: "John Doe"
 *               email: "example@gmail.com"
 */
router.post('/customer', customerController.postCustomer);
/**
 * @swagger
 * /customer/{id}:
 *   get:
 *     tags: [Customers]
 *     summary: Retrieve a single customer by ID
 *     description: Returns a JSON object of a customer with the specified ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the customer to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The customer object with the specified ID
 *         content:
 *           application/json:
 *             example:
 *               name: "John Doe"
 *               email: "example@gmail.com"
 *       404:
 *         description: Customer not found with the specified ID
 */
router.get('/customer/:id', customerController.getCustomer);
/**
 * @swagger
 * /customer/{id}:
 *   put:
 *     tags: [Customers]
 *     summary: Update a single customer by ID
 *     description: Updates an existing customer object in the database with the specified data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the customer to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *               name: "John Doe"
 *               email: "example@gmail.com"
 *     responses:
 *       200:
 *         description: The updated customer object
 *         content:
 *           application/json:
 *             example:
 *               name: "John Doe"
 *               email: "example@gmail.com"
 *       404:
 *         description: Customer not found with the specified ID
 */
router.put('/customer/:id', customerController.putCustomer);
/**
 * @swagger
 * /customer/{id}:
 *   delete:
 *     tags: [Customers]
 *     summary: Delete a single customer by ID
 *     description: Deletes a customer object from the database with the specified ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the customer to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Customer successfully deleted
 *       404:
 *         description: Customer not found with the specified ID
 */
router.delete('/customer/:id', customerController.deleteCustomer);

module.exports = router;