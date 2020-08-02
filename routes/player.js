const express = require('express');
const playerApi = require('../api/player');
const router = express.Router();

router.post('/save', playerApi.addPlayer);
router.get('/id::id', playerApi.getPlayerById);
router.get('/session-player', playerApi.getSessionPlayerId);
router.get('/logout', playerApi.playerLogout);
router.get('/get-player', playerApi.getPlayerSelf)
router.get('/isauth', playerApi.isAuth)

module.exports = router;
