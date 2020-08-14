const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const Player = require('../models/Player');
const createError = require('http-errors');
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
    if (profile.guilds.filter(entry => (entry.id === process.env.DISCORD_SERVER_ID)).length > 0) {
        console.time('authtime')
        Player.findOne({ discordId: profile.id })
            .then(player => {
                if (player) {
                    const filteredPlayer = _.omit(player.toObject(), ['discordId']);
                    cb(null, filteredPlayer);
                } else {
                    console.log('User doesnt exist');
                    const newPlayer = new Player({ discordId: profile.id, permissions: 'member', wishlist: { locked: false } });
                    newPlayer.save()
                        .then(player => {
                            const filteredPlayer = _.omit(player.toObject(), ['discordId']);
                            console.timeEnd('authtime')
                            cb(null, filteredPlayer); //should only contain _id now
                        })
                        .catch(err => {
                            cb(new createError(500, 'Failed to save player to database (strategies/discordStrategies), error text: ' + err), null);
                        })
                }
            })
            .catch(err => {
                cb(new createError(500, 'Failed to fetch player from database (strategies/discordStrategies), error text: ' + err), null);
            });
    } else {
        cb(new createError(403, 'Access denied, does not belong to guild!'), null);
    }
}));
