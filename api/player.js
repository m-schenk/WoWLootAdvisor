const createError = require('http-errors');
const _ = require('lodash');
const { validationResult, body } = require('express-validator')

const Player = require('../models/Player');
const Item = require('../models/Item')

exports.validate = (method) => {
    switch (method) {
        case 'postPlayerProfile': {
            return [
                body('_name', 'error on name validation').exists().notEmpty().trim().escape(),
                body('_class', 'error on class validation').exists().isIn(['Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Warlock', 'Warrior']).trim().escape(),
                body('_race', 'error on race validation').exists().isIn(['Dwarf', 'Gnome', 'Human', 'Night Elf']).trim().escape(),
                body('_role', 'error on role validation').exists().isIn(['DPS', 'Heal', 'Tank']).trim().escape()
            ]
        }
        case 'postSaveWishlist': {
            return [
                body('wishlist').custom((wishlist, { req }) => {
                    // hunter rule
                    let isHunter = false;
                    if (req.user.class === 'Hunter') {
                        isHunter = true;
                    }
                    checkWishlistItems(wishlist, isHunter)
                    .then((result) => {
                        console.log(result)
                        return
                    }, (err) => {
                        throw new Error(err)
                    })
                })
            ]
        }
    }
}

exports.postPlayerProfile = (req, res, next) => {
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        return `${location}[${param}]: ${msg}`;
    };
    const err = validationResult(req).formatWith(errorFormatter);
    if (!err.isEmpty()) {
        return next(createError(422, 'Failed to validate player (api/player postPlayerProfile()), error text: ' + err.array()));
    }
    Player.findById(req.user._id)
        .then(player => {
            player.name = req.body._name;
            player.class = req.body._class;
            player.race = req.body._race;
            player.role = req.body._role;
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
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        return `${location}[${param}]: ${msg}`;
    };
    const err = validationResult(req).formatWith(errorFormatter);
    if (!err.isEmpty()) {
        return next(createError(422, 'Failed to validate wishlist (api/player postSaveWishlist()), error text: ' + err.array()));
    }
    Player.findById(req.user._id)
        .then(player => {
            if (player.wishlist.locked) {
                res.status(200);
                res.set({ 'Content-Type': 'text/json' });
                res.json({ wishlist: player.wishlist });
                res.end();
            } else {
                player.wishlist.bracket1 = getIdsFromBracket(req.body.wishlist.bracket1);
                player.wishlist.bracket2 = getIdsFromBracket(req.body.wishlist.bracket2);
                player.wishlist.bracket3 = getIdsFromBracket(req.body.wishlist.bracket3);
                player.wishlist.bracket4 = getIdsFromBracket(req.body.wishlist.bracket4);
                player.wishlist.bracketLess = getIdsFromBracket(req.body.wishlist.bracketless);
                player.save()
                .then(player => {
                    res.status(200);
                    res.set({ 'Content-Type': 'text/json' });
                    res.json({ wishlist: player.wishlist });
                    res.end();
                }).catch(err => {
                    return next(createError(500, 'Failed to save wishlist in database (api/player postSaveWishlist()), error text: ' + err));
                })
            }
        })
        .catch(err => {
            return next(createError(500, 'Failed to fetch player from database, probably because player was not authenticated at the time the wishlist was submitted (controllers/wishlist saveWishlist()), error text: ' + err));
        });
}

const checkWishlistItems = (wishlist, hunter) => {
    return new Promise((resolve, reject) => {
        const itemIds = [];
        //get all item id's from ever bracket

        Object.keys(wishlist).forEach(bracket => {
            wishlist[bracket].forEach(item => {
                if (item) {
                    itemIds.push(item.id);
                }
            });
        })
        console.log(itemIds);
        const unique = itemIds.filter((v, i, a) => a.indexOf(v) === i)
        if(itemIds.length !== unique.length) {
            reject('wishlist contains duplicates')
        }
    })
    //call unique or something compare lengths?
}

const checkAllocatedBracket = (bracket) => {

}

//validationm helper function
function checkBracket(bracket, bracketLess) {
    console.log(bracket)
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
            return new Error('Failed to fetch one or more items from the submitted wishlist brackets (routes/wishlist checkBracket()), error text: ' + err);
        });
    })
}

// if item is unlimited
// dont allow unlockable items (itemCategory == 'Unlockable')
// no duplicate item types
// allow only 3 allocation points per bracket
// reserved items use two items slots
// check maxiumum bracket size -> 6

const getIdsFromBracket = (bracket) => {
    const _bracket = [];
    bracket.forEach(item => {
        if(item) {
            _bracket.push(item.id);
        }
    });
    return _bracket;
}
