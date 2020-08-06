const Player = require('../models/Player');
const Wishlist = require('../models/Wishlist');
const createError = require('http-errors');
const _ = require('lodash');

exports.postPlayerProfile = (req, res, next) => {
    console.log(req.body)
    const player = new Player({
        discordId: req.body.id,
        name: req.body.name,
        class: req.body.class,
        race: req.body.race,
        talent: req.body.talent,
        rank: req.body.rank,
        aq_attendance: req.body.aq_attendance,
        naxx_attendance: req.body.naxx_attendance,
    });
    player.save()
        .then(player => {
            const filteredPlayer = _.omit(player.toObject(), ['discordId'])
            res.status(200);
            res.set({ 'Content-Type': 'text/json' });
            res.json({ isComplete: true, player: filteredPlayer });
            res.end();
        })
        .catch(err => {
            return next(createError(500, 'Failed to save new player profile in database (api/player postPlayerProfile()), error text:' + err));
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
            return next(createError(500, 'Failed to fetch player from database (api/player getPlayerProfile()), error text:' + err));
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
            return next(createError(500, 'Failed to fetch player from database (api/player getPlayerById()), error text:' + err));
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
