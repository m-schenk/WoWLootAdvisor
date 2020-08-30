const express = require('express');
const councilApi = require('../api/council');
const router = express.Router();

/* GET users listing. */
router.post('/lockMember', councilApi.lockMember);
router.post('/unlockMember', councilApi.unlockMember);

module.exports = router;