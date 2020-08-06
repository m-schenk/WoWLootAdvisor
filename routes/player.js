const express = require('express');
const playerApi = require('../api/player');
const router = express.Router();

router.post('/postPlayerProfile', playerApi.postPlayerProfile);
router.get('/getPlayerProfile', playerApi.getPlayerProfile);
router.get('/logout', playerApi.logout);

router.get('/id::id', playerApi.getPlayerById);

module.exports = router;
