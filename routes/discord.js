const express = require('express');
const discordController = require('../controllers/discord');
const router = express.Router();

const fetch = require('node-fetch');
const redirect = 'http://localhost:3000/discord/success';
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
  const url = 'https://discord.com/api/oauth2/authorize?client_id=734533006114553866&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord%2Fsuccess&response_type=code&scope=identify%20guilds%20email';
  res.redirect(url);
});

router.get('/success', catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error('NoCodeProvided');
  const code = req.query.code;
  console.log('CODESHIT', code);
  
  
  const data = {
    client_id: process.env.CLIENT_ID, // replace with new discord app from wow channel
    client_secret: process.env.CLIENT_SECRET, // replace with new discord app from wow channel
    grant_type: 'authorization_code',
    redirect_uri: redirect,
    code: code,
    scope: 'identify guilds email'
  };
  const response = await fetch('https://discordapp.com/api/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  const json = await response.json();
  console.log('fuckyou', json);

  console.log('ACCESS TOKEN:', json.access_token);
  

  const gotodiscordplease = await fetch('http://discordapp.com/api/users/@me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${json.access_token}`,
    },

  });
  const user = await gotodiscordplease.json();
  
  console.log('user object:', user);
  
  
  res.redirect(`/?token=${json.access_token}`);
}));



module.exports = router;


/*
TODO check if user belongs to guild discord server
TODO if userId doesnt exist => create new user
TODO send profile to frontend (the whole player object)
*/
