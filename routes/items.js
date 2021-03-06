const express = require('express');
const itemsApi = require('../api/items');
const router = express.Router();

/* GET users listing. */
router.get('', itemsApi.validate('getQuery'), itemsApi.getQuery);
router.put('/modifyItem', itemsApi.modify);
router.get('/id::id', itemsApi.getItemById);

module.exports = router;
