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
                    return checkWishlistItems(wishlist, isHunter);
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
    console.time('dbat-playerprofile')
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
            console.timeEnd('dbat-playerprofile')
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
        res.redirect(process.env.ADDR + '/login');
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
    console.log(req.user)
    Player.findById(req.user._id)
        .then(player => {
            if ((player.wishlist !== null) && (player.wishlist.locked)) {
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
        const maxAllocationPoints = hunter ? 2 : 3;
        const itemIds = [];

        const weapon = ["Sword", "Mace", "Polearm", "Two-Hand, Sword", "Two-Hand, Axe", "Dagger", "Axt", "Two-Hand, Mace", "Staff", "Fist Weapon"];
        const ranged = ["Bow", "Crossbow", "Gun", "Relic", "Wand"];
        const offhand = ["Shield", "Offhand"];

        let bracketsDone = 0;
        let bracketless = false;
        if(Object.keys(wishlist) === null) { reject('wishlist is empty AF'); }
        Object.keys(wishlist).forEach(bracket => {

            if (bracketsDone >= 4 || hunter && bracketsDone >= 3) {
                bracketless = true;
            }

            let allocationPoints, count = 0;
            let itemTypes = new Set();
            let nextMustBeNull = false;

            if (wishlist[bracket] !== null) {
                wishlist[bracket].forEach(item => {
                    if(nextMustBeNull && item !== null) {
                        reject('bracket invalid, after reserved item, slot must be empty');
                    } else {
                        nextMustBeNull = false;
                    }
                    count++;
                    if (item) {
                        itemIds.push(item.id);

                        if (item.itemCategory === 'Reserved') {
                            nextMustBeNull = true;
                        }

                        const itemType = weapon.includes(item.itemType) ? "Weapon" : ranged.includes(itemTypes) ? "Ranged" : offhand.includes(item.itemTyped) ? "Offhand" : item.itemType;
                        if (itemTypes.has(itemType)) {
                            reject('bracket has duplicate item type');
                        }
                        itemTypes.add(itemType);

                        if ((item.itemCategory === 'Reserved') || (item.itemCategory === 'Limited'))
                            allocationPoints++;
                    }
                    if (allocationPoints > maxAllocationPoints) {
                        reject('bracket exceeds allocation points');
                    }
                    if (!bracketless && count > 6) {
                        reject('bracket has more than 6 items');
                    }
                });
                bracketsDone++;
            }
        })

        // check if all items are unique
        const unique = itemIds.filter((v, i, a) => a.indexOf(v) === i)
        if (itemIds.length !== unique.length) {
            reject('wishlist contains duplicates');
        }
        resolve('wishlist is valid');
    })
}

const getIdsFromBracket = (bracket) => {
    const _bracket = [];
    if (bracket === null) return null;
    bracket.forEach(item => {
        if (item) {
            _bracket.push(item.id);
        } else {
            _bracket.push(null)
        }
    });
    if (_bracket.length === 0) {
        return null;
    } else {
        return _bracket;
    }
}
