const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const Player = require('../models/Player');

passport.serializeUser((player, done) => {
    done(null, player._id);
});

passport.deserializeUser((_id, done) => {
    User.findById(_id, (err, player) => {
        done(err, player);
    });
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
                cb(null, player);
            } else {
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
