const createError = require('http-errors');
const _ = require('lodash');
const { validationResult, body } = require('express-validator')

const Player = require('../models/Player');

exports.validate = (method) => {
    switch (method) {
        case 'postPlayerProfile': {
            return [
                body('name').exists().notEmpty().trim().escape(),
                body('class').exists().isIn(['Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Warlock', 'Warrior']).trim().escape(),
                body('race').exists().isIn(['Dwarf', 'Gnome', 'Human', 'Night Elf']).trim().escape(),
                body('role').exists().isIn(['DPS', 'Heal', 'Tank']).trim().escape()
            ]
        };
        case 'postSaveWishlist': {
            return [
                body().custom((value, { req }) => {
                    console.log(req.user)
                    let isHunter = false;
                    Player.findById(req.user._id).then(player => {
                        if (player.class === 'Hunter') {
                            isHunter = true;
                        }
                    })
                    console.log("here 2")
                    const p = Promise.all([
                        checkBracket(value.bracket1, false),
                        checkBracket(value.bracket2, false),
                        checkBracket(value.bracket3, false),
                        checkBracket(value.bracket4, false),
                        checkBracket(value.bracketless, true)
                    ])
                    return p.then(result => {
                        console.log(result);
                    })
                })
            ]
        };
    }
}

exports.postPlayerProfile = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return next(createError(422, 'Failed to validate player (api/player postPlayerProfile()), error text: ' + err));
    }
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
            let complete = true;
            if (!player.name) { complete = false; }
            if (!player.class) { complete = false; }
            if (!player.race) { complete = false; }
            if (!player.role) { complete = false; }
            const filteredPlayer = _.omit(player.toObject(), ['discordId'])
            res.status(200);
            res.set({ 'Content-Type': 'text/json' });
            res.json({ isComplete: complete, player: filteredPlayer });
            res.end();
        })
        .catch(err => {
            return next(createError(500, 'Failed to fetch player from database (api/player getPlayerProfile()), error text: ' + err));
        });
}

exports.getPlayerById = (req, res, next) => {
    Player.findById(req.params.id)
        .then(player => {
            let complete = true;
            if (!player.name) { complete = false; }
            if (!player.class) { complete = false; }
            if (!player.race) { complete = false; }
            if (!player.role) { complete = false; }
            const filteredPlayer = _.omit(player.toObject(), ['discordId'])
            res.status(200);
            res.set({ 'Content-Type': 'text/json' });
            res.json({ isComplete: complete, player: filteredPlayer });
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
        return next(createError(422, 'Failed to validate wishlist (api/player postSaveWishlist()), error text: ' + err));
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

//validationm helper function
function checkBracket(bracket, bracketLess) {
    return new Promise((resolve, reject) => {
        Item.find({
            'id': {
                $in: [
                    ...bracket
                ]
            }
        }).then(items => {
            console.log(items)
            let allocationPoints = 0;   // should not exceed 3
            let itemSlots = 0;          // should not exceed 2
            let occupiedSlots = 0;      // should not exceed 6

            for (i = 0; i < items.length; i++) {
                for (j = 0; j < i; j++) {
                    if (i == j) continue;
                    if (items[i].itemType == items[j].itemType) {
                        // console.log(result[i].itemType, '==', result[j].itemType);
                        reject('Bracket has duplicate item types');
                    }
                }

                if (items[i].id && !bracketLess) {
                    occupiedSlots++;
                }
                if (items[i].itemCategory == 'Reserved' || items[i].itemCategory == 'Limited') {
                    allocationPoints++;
                    if (items[i].itemCategory == 'Reserved') {
                        itemSlots++;
                        if (itemSlots > 2) {
                            reject('Maximum amount of reserved items(2) exceeded');
                        }
                    }
                    //   if (allocationPoints > 2 && isHunter) {
                    //     console.log('HUNTER SHITS');
                    //     reject('Maximum allocation points(2) exceeded -> hunter class penalty');
                    //   }
                    if (allocationPoints > 3) {
                        reject('Maximum allocation points(3) exceeded');
                    }
                }
                if (occupiedSlots > 6) {
                    reject('Maximum item slots(6) exceeded')
                }
                if (items[i].itemCategory == 'Unlockable') {
                    reject('Might of the Scourge, Power of the Storm and Splinter of Atiesh are forbidden items');
                }
            }
            resolve('Wishlist is valid!');
        }).catch(err => {
            return next(createError(500, 'Failed to fetch one or more items from the submitted wishlist brackets (routes/wishlist checkBracket()), error text: ' + err));
        });
    })
}

// if item is unlimited
// dont allow unlockable items (itemCategory == 'Unlockable')
// no duplicate item types
// allow only 3 allocation points per bracket
// reserved items use two items slots
// check maxiumum bracket size -> 6