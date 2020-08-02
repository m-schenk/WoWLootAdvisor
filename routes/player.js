const express = require('express');
const playerController = require('../controllers/player');
const playerApi = require('../api/player');
const router = express.Router();

router.post('/save', playerController.addPlayer);
router.get('/id::id', playerController.getPlayerById);
router.get('/session-player', playerController.getSessionPlayerId);
router.get('/logout', playerController.playerLogout);
router.get('/get-player', playerController.getPlayerSelf)

router.get('/isauth', playerApi.isAuth)

module.exports = router;
