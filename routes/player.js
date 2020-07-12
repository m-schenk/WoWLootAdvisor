const express = require('express');
const playerController = require('../controllers/player');
const router = express.Router();

router.post('/save', playerController.addPlayer);


router.get('/id::id', playerController.getPlayerById);



module.exports = router;
