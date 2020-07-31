const express = require('express');
const discordAPI = require('../api/discord');
const router = express.Router();
const isAuth = require('../middleware/is-auth'); //use this middleware in each route that should only be accessible when authenticated

router.get('/login', discordAPI.getDiscordAuthUrl);
router.get('/callback', discordAPI.getDiscordUserObject);
router.get('/test', discordAPI.test);

module.exports = router;

/*
TODO if userId doesnt exist => create new user
TODO send profile to frontend (the whole player object)
*/
