const express = require('express');
const discordApi = require('../api/discord');
const router = express.Router();

router.get('/login', discordApi.getDiscordAuthUrl);
router.get('/callback', discordApi.getDiscordUserObject);

module.exports = router;
