const express = require('express');
const itemsController = require('../api/items');
const router = express.Router();

/* GET users listing. */
router.get('',itemsController.getQuery);
router.get('/test', itemsController.getMockData);
router.put('/modifyItem', itemsController.modify);
router.get('/id::id', itemsController.getItemById);

module.exports = router;
