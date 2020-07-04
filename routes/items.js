const express = require('express');
const itemsController = require('../controllers/items');
const router = express.Router();

/* GET users listing. */
router.get('',itemsController.getQuery);

router.get('/test', itemsController.getMockData);

router.put('/modifyItem', itemsController.modify);






module.exports = router;
