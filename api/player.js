const Player = require('../models/Player');
const Wishlist = require('../models/Wishlist');

exports.addPlayer = (req, res, next) => {

    const player = new Player({
        id: req.body.id,
        name: req.body.name,
        class: req.body.class,
        race: req.body.race,
        talent: req.body.talent,
        aq_attendance: req.body.aq_attendance,
        naxx_attendance: req.body.naxx_attendance,
        wishlist: req.body.wishlist
    });

    player.save()
        .then(player => {
            res.status(201).json({ message: 'Player created successfully' });
        })
        .catch(err => {
            const error = new Error(err);
            error.message = 'Failed to save new player in database (controllers/player addPlayer())';
            error.httpStatusCode = 500;
            return next(error);
        });
}


exports.getPlayerById = (req, res, next) => {
    const playerId = req.params.id;

    console.log('id', playerId);


    Player.findOne({ id: playerId })
        .populate({ path: 'wishlist', model: Wishlist })
        .then(player => {
            console.log(player);

            res.status(200).json({ player: player });
        })
        .catch(err => {
            const error = new Error(err);
            error.message = 'Failed to fetch player from database (controllers/player getPlayerById())';
            error.httpStatusCode = 500;
            return next(error);
        });
}

exports.getSessionPlayerId = (req, res, next) => {
    res.status(200).json({ playerId: req.session.playerId })
}

exports.playerLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log('logged out');
        res.redirect(process.env.DISCORD_CALLBACK_URI);
    })
}

exports.getPlayerSelf = (req, res, next) => {
    Player.find({ id: req.session.playerId })
        .then(player => {
            res.send(200).json({ player: player })
        })
        .catch(err => {
            const error = new Error(err);
            error.message = 'Failed to fetch player from database (controllers/player getPlayerSelf())';
            error.httpStatusCode = 500;
            return next(error);
        });

}
exports.isAuth = (req, res, next) => {
    res.status(200).json({ validation: true})
}
