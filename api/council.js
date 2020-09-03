const createError = require('http-errors');
const _ = require('lodash');
const { validationResult, param } = require('express-validator')

const Player = require('../models/Player');

exports.validate = (method) => {
    switch (method) {
        case 'player': {
            return [
                param('name', 'error on name validation').exists().isLength({ max: 25 }).notEmpty().trim().escape(),
            ]
        }
    }
}

exports.lockMember = (req, res, next) => {
    console.log(req.user.name + " is trying to locked " + req.body.member.name + " wishlist.");
    // const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    //     // Build your resulting errors however you want! String, object, whatever - it works!
    //     return `${location}[${param}]: ${msg}`;
    // };
    // const err = validationResult(req).formatWith(errorFormatter);
    // if (!err.isEmpty()) {
    //     return next(createError(422, 'Failed to validate request (api/council lockMember()), error text: ' + err.array()));
    // }

    Player.findById(req.body.player.id)
        .then(player => {
            player.wishlist.locked = true;
            player.save()
                .then(player => {
                    console.log(req.user.name + " has locked " + player.name + "'s wishlist.");
                    res.status(200);
                    res.set({ 'Content-Type': 'text/json' });
                    res.json({ success: true });
                    res.end();
                }).catch(err => {
                    return next(createError(500, 'Failed to save player to database (api/council lockMember()), error text: ' + err));
                })
        }).catch(err => {
            return next(createError(500, 'Failed to fetch player from database (api/council lockMember()), error text: ' + err));
        })
}

exports.unlockMember = (req, res, next) => {
    console.log(req.user.name + " is trying to unlocked " + req.body.member.name + " wishlist.");
    // const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    //     // Build your resulting errors however you want! String, object, whatever - it works!
    //     return `${location}[${param}]: ${msg}`;
    // };
    // const err = validationResult(req).formatWith(errorFormatter);
    // if (!err.isEmpty()) {
    //     return next(createError(422, 'Failed to validate request (api/council unlockMember()), error text: ' + err.array()));
    // }

    if (req.user.discordId !== 220455564231049216) {
        return next(createError(500, 'Nice try u fucks, gilt auch für euch, WISHLISTS bleiben locked xd (api/council unlockMember())'));
    }

    Player.findById(req.body.player.id)
        .then(player => {
            player.wishlist.locked = false;
            player.save()
                .then(player => {
                    console.log(req.user.name + " has unlocked " + player.name + "'s wishlist.");
                    res.status(200);
                    res.set({ 'Content-Type': 'text/json' });
                    res.json({ success: true });
                    res.end();
                }).catch(err => {
                    return next(createError(500, 'Failed to save player to database (api/council unlockMember()), error text: ' + err));
                })
        }).catch(err => {
            return next(createError(500, 'Failed to fetch player from database (api/council unlockMember()), error text: ' + err));
        })
}

exports.player = (req, res, next) => {
    console.log(req.user.name + " is trying to look at " + req.params.name + " wishlist.");
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        return `${location}[${param}]: ${msg}`;
    };
    const err = validationResult(req).formatWith(errorFormatter);
    if (!err.isEmpty()) {
        return next(createError(422, 'Failed to validate request (api/council lockMember()), error text: ' + err.array()));
    }
    if (req.user.discordId !== 220455564231049216) {
        return next(createError(403, 'no access'));
    }

    Player.findOne({ name: req.param.name })
        .populate('wishlist')
        .then(player => {
            res.status(200);
            res.set({ 'Content-Type': 'text/json' });
            res.json({ wishlist: player.wishlist });
            res.end();
        }).catch(err => {
            return next(createError(500, 'Failed to fetch player from database (api/council player()), error text: ' + err));
        })
}