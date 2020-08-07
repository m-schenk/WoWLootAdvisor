const express = require('express');
const router = express.Router();

const playerApi = require('../api/player');

router.post('/postPlayerProfile', playerApi.postPlayerProfile);
router.get('/getPlayerProfile', playerApi.getPlayerProfile);
router.get('/logout', playerApi.logout);

router.get('/id::id', playerApi.getPlayerById);

module.exports = router;
