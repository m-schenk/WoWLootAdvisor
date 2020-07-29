const fetch = require('node-fetch');
const btoa = require('btoa');
const redirect = 'http://localhost:3000/discord/success';
const { catchAsync } = require('../utils');


exports.getValue = (req, res, next) => {
  res.status(200).json({ value: 12 });
}

exports.getDiscordAuthUrl = (req, res, next) => {
    const url = 'https://discord.com/api/oauth2/authorize?client_id=734533006114553866&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord%2Fsuccess&response_type=code&scope=identify%20guilds%20email';
    res.redirect(url);
};

exports.test = (req, res, next)  => {
    res.status(200).json({ value: "HUREHESEHIW=E=?" })
};

exports.getDiscordUserObject = catchAsync(async (req, res) => {
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
  if(json.error) {
      throw new Error(json.error)
  }
  console.log('fuckyou', json);

  // console.log('ACCESS TOKEN:', json.access_token);
  
// 	allows /users/@me/guilds to return basic information about all of a user's guilds
  const userObject = await fetch('http://discordapp.com/api/users/@me', {
    method: 'GET',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${json.access_token}`,
    },

  });
  const user = await userObject.json();
  
  console.log('user object:', user);



  const userGuilds = await fetch('http://discordapp.com/api/users/@me/guilds', {
    method: 'GET',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${json.access_token}`,
    },

  });
  let guilds = []
  guilds = await userGuilds.json();
  
  // console.log('guild object:', guilds);



  guilds.forEach(guild => {
    if (guild.id === process.env.DISCORD_SERVER_ID) {
      
      req.session.isLoggedIn = true;
      console.log('session:', req.session.isLoggedIn);
      
      return res.status(200).json({ access_token: json.access_token }).end();
    }
  });

  return res.status(401).end();


  // res.redirect(401, '/login');

  
  
  
});

