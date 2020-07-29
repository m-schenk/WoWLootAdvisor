const Player = require('../models/Player');
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
  // console.log('fuckyou', json);

  // console.log('ACCESS TOKEN:', json.access_token);
  
// 	allows /users/@me/guilds to return basic information about all of a user's guilds
  const userObject = await fetch('http://discordapp.com/api/users/@me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${json.access_token}`,
    },

  });
  const user = await userObject.json();
  
  console.log('user object:', user);



  const userGuilds = await fetch('http://discordapp.com/api/users/@me/guilds', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${json.access_token}`,
    },

  });
  const guilds = await userGuilds.json();
  
  // console.log('guild object:', guilds);

  let belongsToGuild = false;

  guilds.forEach(guild => {
    if (guild.id === process.env.DISCORD_SERVER_ID) {
      belongsToGuild = true;
      req.session.isLoggedIn = true;
      Player.findOne({ id: user.id })
      .then(player => {
        if (!player) {
          const newPlayer = new Player ({
            id: user.id,
            name: user.username
          });
          newPlayer.save();
          return res.status(200).json({ access_token: json.access_token, player: newPlayer }).end();
        } else {
          return res.status(200).json({ access_token: json.access_token, player: player }).end();
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  });
  if (!belongsToGuild) {
      return res.status(401).json({ message: 'Access denied, does not belong to guild!' }).end();
  }
});

