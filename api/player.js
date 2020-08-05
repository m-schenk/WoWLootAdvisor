const Player = require('../models/Player');
const Wishlist = require('../models/Wishlist');
const _ = require('lodash');

exports.postPlayerProfile = (req, res, next) => {
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
            res.status(201).json({ player: filteredPlayer });
        })
        .catch(err => {
            const error = new Error(err);
            error.message = 'Failed to save new player profile in database (controllers/player saveProfile())';
            error.httpStatusCode = 500;
            return next(error);
        });
}

exports.getPlayerById = (req, res, next) => {
    const playerId = req.params.id;

    Player.findOne({ id: playerId })
        .populate({ path: 'wishlist', model: Wishlist })
        .then(player => {
            res.status(200).json({ player: player });
        })
        .catch(err => {
            const error = new Error(err);
            error.message = 'Failed to fetch player from database (controllers/player getPlayerById())';
            error.httpStatusCode = 500;
            return next(error);
        });
}

exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if(err) {
            next(err);
        }
        res.redirect('http://raegae.maarten.ch:3000/login');
    })
}

exports.getPlayerProfile = (req, res, next) => {
    console.log(req.user)
    Player.findById(req.user._id)
        .then(player => {
            const filteredPlayer = _.omit(player.toObject(), ['discordId'])
            res.status(200);
            res.set({'Content-Type': 'text/json'});
            res.json({ isComplete: true, player: filteredPlayer});
            res.end();
        })
        .catch(err => {
            const error = new Error(err);
            error.message = 'Failed to fetch player from database (controllers/player getPlayer())';
            error.httpStatusCode = 500;
            return next(error);
        });

}
