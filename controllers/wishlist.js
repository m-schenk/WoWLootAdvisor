const Wishlist = require('../models/Wishlist');
const Player = require('../models/Player');
const { validationResult } = require('express-validator');

exports.saveWishlist = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('ERRORS ARRAY', errors.array());
        return res.status(406).json({ message: errors });
    }

    Player.findOne({ id: req.session.playerId }) // check if player has wishlist already
        .then(player => {
            if (player.wishlist) {
                res.status(400).json({ message: player.name + ' has wishlist already' });
            } else { // player has not yet created his wishlist
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
                                const error = new Error(err);
                                error.message = 'Failed to update player with wishlist mongoDbId in database (controllers/wishlist saveWishlist())';
                                error.httpStatusCode = 500;
                                return next(error);
                            });
                        res.status(201).json({ message: 'wishlist has been saved' });
                    })
                    .catch(err => {
                        const error = new Error(err);
                        error.message = 'Failed to save wishlist in database (controllers/wishlist saveWishlist())'
                        error.httpStatusCode = 500;
                        return next(error);
                    });
            }
        })
        .catch(err => {
            const error = new Error(err);
            error.message = 'Failed to fetch player from database, probably because player was not authenticated at the time the wishlist was submitted (controllers/wishlist saveWishlist())';
            error.httpStatusCode = 500;
            return next(error);
        });
}


