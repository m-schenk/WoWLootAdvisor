const express = require('express');
const discordAPI = require('../api/discord');
const router = express.Router();

router.get('/login', discordAPI.getDiscordAuthUrl);
router.get('/callback', discordAPI.getDiscordUserObject);

module.exports = router;
