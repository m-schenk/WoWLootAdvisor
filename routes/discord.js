const express = require('express');
const discordController = require('../controllers/discord');
const router = express.Router();

const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();
const fetch = require('node-fetch');
const btoa = require('btoa');
const redirect = encodeURIComponent('http://localhost:50451/api/discord/success');
const { catchAsync } = require('../utils');

// oauth.tokenRequest({
//   clientId: "734533006114553866",
//   clientSecret: "afzhIkyBQNgB1Ohh_ONdy7EPkKB8lf0u",

//   code: "query code",
//   scope: "identify",
//   grantType: "authorization_code",
  
//   redirectUri: "http://localhost:3000/",
// }).then(result => {
  
// }).
// catch(err => {
//   console.log(err);
  
// })



router.get('/login', (req, res) => {
  const url = 'https://discord.com/api/oauth2/authorize?client_id=734533006114553866&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord%2Fsuccess&response_type=code&scope=identify';
  
  res.redirect(url);
});

router.get('/success', catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error('NoCodeProvided');
  const code = req.query.code;
  console.log('CODESHIT', code);
  
  
  const creds = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
  const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`,
      },
    });
  const json = await response.json();
  console.log('fuckyou', json);
  
  res.redirect(`/?token=${json.access_token}`);
}));



module.exports = router;