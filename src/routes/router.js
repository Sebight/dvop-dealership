const express = require('express');
const router = express.Router();

const exampleController = require('../controllers/example/example');

router.get('/', (req, res) => res.status(404).send('404'));
router.get('/example', exampleController.getExample);
router.post('/example', exampleController.postExample);

module.exports = router;