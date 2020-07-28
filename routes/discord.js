const express = require('express');
const discordAPI = require('../api/discord');
const router = express.Router();

router.get('/login', discordAPI.getDiscordAuthUrl);
router.get('/success', discordAPI.getDiscordUserObject);

module.exports = router;

/*
TODO if userId doesnt exist => create new user
TODO send profile to frontend (the whole player object)
*/
