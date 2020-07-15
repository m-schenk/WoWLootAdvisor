const Player = require('../models/Player');

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
        res.status(201).json({ message: 'Player created successfully'});
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}


exports.getPlayerById = (req, res, next) => {
    const playerId = req.params.id;

    console.log('id', playerId);
    

    Player.findOne({ id: playerId })
    .then(player => {
        console.log(player);
        
        res.status(200).json({ player: player });
    })
}