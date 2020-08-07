const createError = require('http-errors');
const _ = require('lodash');
const { validationResult } = require('express-validator');

const Player = require('../models/Player');
const Wishlist = require('../models/Wishlist');

exports.postPlayerProfile = (req, res, next) => {
    console.log(req.body)
    Player.findById(req.user._id)
        .then(player => {
            player.name = req.body.name;
            player.class = req.body.class;
            player.race = req.body.race;
            player.role = req.body.role;

            player.save()
                .then(player => {
                    const filteredPlayer = _.omit(player.toObject(), ['discordId'])
                    res.status(200);
                    res.set({ 'Content-Type': 'text/json' });
                    res.json({ isComplete: true, player: filteredPlayer });
                    res.end();
                })
                .catch(err => {
                    return next(createError(500, 'Failed to save player profile in database (api/player postPlayerProfile()), error text: ' + err));
                });
        }).catch(err => {
            return next(createError(500, 'Failed to fetch player from database (api/player postPlayerProfile()), error text: ' + err));
        });
}

exports.getPlayerProfile = (req, res, next) => {
    Player.findById(req.user._id)
        .then(player => {
            const filteredPlayer = _.omit(player.toObject(), ['discordId'])
            res.status(200);
            res.set({ 'Content-Type': 'text/json' });
            res.json({ isComplete: true, player: filteredPlayer });
            res.end();
        })
        .catch(err => {
            return next(createError(500, 'Failed to fetch player from database (api/player getPlayerProfile()), error text: ' + err));
        });
}

exports.getPlayerById = (req, res, next) => {
    const playerId = req.params.id;
    Player.findOne({ id: playerId })
        .populate({ path: 'wishlist', model: Wishlist })
        .then(player => {
            const filteredPlayer = _.omit(player.toObject(), ['discordId'])
            res.status(200);
            res.set({ 'Content-Type': 'text/json' });
            res.json({ isComplete: true, player: filteredPlayer });
            res.end();
        })
        .catch(err => {
            return next(createError(500, 'Failed to fetch player from database (api/player getPlayerById()), error text: ' + err));
        });
}

exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            next(createError(500, err));
        }
        res.redirect('http://raegae.maarten.ch:3000/login');
    })
}

exports.postSaveWishlist = (req, res, next) => {

    const err = validationResult(req);
    if (!err.isEmpty()) {
        return next(createError(406, 'Failed to validate wishlist (api/wishlist postSaveWishlist()), error text: ' + err));
    }

    Player.findById(req.user._id)
        .then(player => {
            if (player.wishlist.locked) {
                res.status(200);
                res.set({ 'Content-Type': 'text/json' });
                res.json({ wishlist: player.wishlist });
                res.end();
            } else {
                let wishlistObjectId;

                const wishlist = new Wishlist({
                    bracket1: req.body.bracket1,
                    bracket2: req.body.bracket2,
                    bracket3: req.body.bracket3,
                    bracket4: req.body.bracket4,
                    bracketLess: req.body.bracketLess,
                })

                wishlist.save()
                    .then(wishlist => {
                        wishlistObjectId = wishlist._id;
                        Player.findOneAndUpdate({ id: req.session.playerId }, { wishlist: wishlistObjectId }) //assign wishlist object id to player
                            .then(player => {
                                console.log('wishlist', wishlistObjectId, 'has been assigned to', player.name);
                            })
                            .catch(err => {
                                return next(createError(500, 'Failed to update player with wishlist mongoDbId in database (controllers/wishlist saveWishlist()), error text: ' + err));
                            });
                        res.status(200);
                        res.set({ 'Content-Type': 'text/json' });
                        res.json({ wishlist: player.wishlist });
                        res.end();
                    })
                    .catch(err => {
                        return next(createError(500, 'Failed to save wishlist in database (controllers/wishlist saveWishlist()), error text: ' + err));
                    });
            }
        })
        .catch(err => {
            return next(createError(500, 'Failed to fetch player from database, probably because player was not authenticated at the time the wishlist was submitted (controllers/wishlist saveWishlist()), error text: ' + err));
        });
}