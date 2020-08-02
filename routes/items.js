const express = require('express');
const itemsApi = require('../api/items');
const router = express.Router();

/* GET users listing. */
router.get('',itemsApi.getQuery);
router.get('/test', itemsApi.getMockData);
router.put('/modifyItem', itemsApi.modify);
router.get('/id::id', itemsApi.getItemById);

module.exports = router;
