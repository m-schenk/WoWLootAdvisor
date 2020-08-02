const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const Player = require('../models/Player');

passport.serializeUser((player, done) => {
    console.log('User serialized')
    done(null, player._id);
});

passport.deserializeUser((id, done) => {
    console.log('User deserialized')
    Player.findById(id)
        .then(player => {
            if (player) {
                done(null, player);
            } else {
                done(err, null);
            }
        })
});

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ['identify', 'guilds']
}, (accessToken, refreshToken, profile, cb) => {
    Player.findOne({ discordId: profile.id })
        .then(player => {
            if (player) {
                console.log('User exists')
                cb(null, player);
            } else {
                console.log('User doesnt exist')
                if (profile.guilds.filter(entry => (entry.id === process.env.DISCORD_SERVER_ID))) {
                    const newPlayer = new Player({ discordId: profile.id })
                    newPlayer.save();
                    cb(null, newPlayer)
                } else {
                    cb(new Error('Access denied, does not belong to guild!'), null);
                }
            }
        })
        .catch(err => {
            cb(err, null)
        })
}));
