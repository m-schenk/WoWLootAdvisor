const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const Player = require('../models/Player');
const _ = require('lodash');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    Player.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ['identify', 'guilds']
}, (accessToken, refreshToken, profile, cb) => {
    // profile is the discord profile, not ours
    Player.findOne({ discordId: profile.id })
        .then(player => {
            if (player) {
                console.log(player)
                const filteredPlayer = _.omit(player.toObject(), ['discordId']);
                console.log(filteredPlayer)
                cb(null, filteredPlayer);
            } else {
                console.log('User doesnt exist');
                if (profile.guilds.filter(entry => (entry.id === process.env.DISCORD_SERVER_ID))) {
                    const newPlayer = new Player({ discordId: profile.id });
                    newPlayer.save()
                        .then( player => {
                            console.log(player)
                            const filteredPlayer = _.omit(player.toObject(), ['discordId']);
                            console.log(filteredPlayer)
                            cb(null, filteredPlayer); //should only contain _id now
                        })
                        .catch( err => {
                            cb(new Error('Could not save new Player to DB'), null);
                        })
                    
                } else {
                    cb(new Error('Access denied, does not belong to guild!'), null);
                }
            }
        })
        .catch(err => {
            cb(err, null);
        })
}));
