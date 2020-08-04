const express = require('express');
const playerApi = require('../api/player');
const router = express.Router();

router.post('/postPlayerProfile', playerApi.postPlayerProfile);
router.get('/getPlayerProfile', playerApi.getPlayerProfile)

router.get('/id::id', playerApi.getPlayerById);
router.get('/session-player', playerApi.getSessionPlayerId);
router.get('/logout', playerApi.playerLogout);

module.exports = router;
