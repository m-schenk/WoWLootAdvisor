const createError = require('http-errors');
const _ = require('lodash');
const { validationResult, body } = require('express-validator')

const Player = require('../models/Player');
const Wishlist = require('../models/Wishlist');
const Item = require('../models/Item');

exports.validate = (method) => {
    switch (method) {
        case 'saveProfile': {
            return [
                body('name', 'error on name validation').exists().notEmpty().trim().escape(),
                body('class', 'error on class validation').exists().isIn(['Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Warlock', 'Warrior']).trim().escape(),
                body('race', 'error on race validation').exists().isIn(['Dwarf', 'Gnome', 'Human', 'Night Elf']).trim().escape(),
                body('role', 'error on role validation').exists().isIn(['DPS', 'Heal', 'Tank']).trim().escape()
            ]
        }
        case 'saveWishlist': {
            return [
                body('wishlist').custom((wishlist, { req }) => {
                    // hunter rule
                    const isHunter = (req.user.class === 'Hunter') ? true : false;
                    // check brackets
                    return checkWishlistItems(wishlist, isHunter);
                })
            ]
        }
    }
}

exports.saveProfile = (req, res, next) => {
    console.log(req.user.name + ": is trying to save profile.")
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        return `${location}[${param}]: ${msg}`;
    };
    const err = validationResult(req).formatWith(errorFormatter);
    if (!err.isEmpty()) {
        return next(createError(422, 'Failed to validate player (api/player saveProfile()), error text: ' + err.array()));
    }
    Player.findById(req.user._id)
        .then(player => {
            player.name = req.body.name;
            player.class = req.body.class;
            player.race = req.body.race;
            player.role = req.body.role;
            player.save()
                .then(player => {
                    const filteredPlayer = _.omit(player.toObject(), ['discordId', 'wishlist'])
                    console.log(req.user.name + ": is has saved profile.")
                    res.status(200);
                    res.set({ 'Content-Type': 'text/json' });
                    res.json({ isComplete: true, player: filteredPlayer });
                    res.end();
                })
                .catch(err => {
                    return next(createError(500, 'Failed to save player profile in database (api/player saveProfile()), error text: ' + err));
                });
        }).catch(err => {
            return next(createError(500, 'Failed to fetch player from database (api/player saveProfile()), error text: ' + err));
        });
}

exports.loadProfile = (req, res, next) => {
    console.log(req.user.name + ": is trying to get profile.")
    Player.findById(req.user._id)
        .then(player => {
            const complete = (!player.name || !player.class || !player.race || !player.role) ? false : true;
            const filteredPlayer = _.omit(player.toObject(), ['discordId', 'wishlist'])
            console.log(req.user.name + ": is has got profile.")
            res.status(200);
            res.set({ 'Content-Type': 'text/json' });
            res.json({ isComplete: complete, player: filteredPlayer });
            res.end();
        })
        .catch(err => {
            return next(createError(500, 'Failed to fetch player from database (api/player loadProfile()), error text: ' + err));
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
    console.log(req.user.name + ": is trying to log out.")
    req.session.destroy((err) => {
        if (err) {
            next(createError(500, err));
        }
        console.log(req.user.name + ": is has logged out.")
        res.redirect(process.env.ADDR + '/login');
    })
}

exports.saveWishlist = (req, res, next) => {
    console.log(req.user.name + ": is trying to save wishlist.")
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        return `${location}[${param}]: ${msg}`;
    };
    const err = validationResult(req).formatWith(errorFormatter);
    if (!err.isEmpty()) {
        return next(createError(422, 'Failed to validate wishlist (api/player saveWishlist()), error text: ' + err.array()));
    }

    Player.findById(req.user._id)
        .populate('wishlist')
        .then(player => {
            if ((player.wishlist !== null) && (player.wishlist.locked)) {
                res.status(200);
                res.set({ 'Content-Type': 'text/json' });
                res.json({ wishlist: player.wishlist });
                res.end();
            } else {
                player.wishlist = req.body.wishlist;
                player.save()
                    .then(player => {
                        console.log(req.user.name + ": is has saved wishlist.")
                        res.status(200);
                        res.set({ 'Content-Type': 'text/json' });
                        res.json({ wishlist: player.wishlist });
                        res.end();
                    }).catch(err => {
                        return next(createError(500, 'Failed to save wishlist in database (api/player saveWishlist()), error text: ' + err));
                    })
            }
        })
        .catch(err => {
            return next(createError(500, 'Failed to fetch player from database, probably because player was not authenticated at the time the wishlist was submitted (controllers/player saveWishlist()), error text: ' + err));
        });
}

exports.loadWistlist = (req, res, next) => {
    console.log(req.user.name + ": is trying to load wishlist.")
    Player.findById(req.user._id)
        .then(player => {
            if ((player.wishlist !== null)) {
                console.log(req.user.name + ": is has loaded wishlist.")
                res.status(200);
                res.set({ 'Content-Type': 'text/json' });
                res.json({ wishlist: player.wishlist });
                res.end();
            } else {
                console.log(req.user.name + ": is has loaded empty wishlist.")
                res.status(200);
                res.set({ 'Content-Type': 'text/json' });
                res.json({ wishlist: null });
                res.end();
            }
        }).catch(err => {
            return next(createError(500, 'Failed to fetch player from database, probably because player was not authenticated at the time the wishlist was loaded (controllers/player loadWishlist()), error text: ' + err));
        });
}

const checkWishlistItems = (wishlist, hunter) => {
    return new Promise((resolve, reject) => {
        console.log("Logging new wishlist format: " + JSON.stringify(wishlist))

        const maxAllocationPoints = hunter ? 2 : 3;
        const itemIds = [];

        const weapon = ["Sword", "Mace", "Polearm", "Two-Hand, Sword", "Two-Hand, Axe", "Dagger", "Axt", "Two-Hand, Mace", "Staff", "Fist Weapon"];
        const ranged = ["Bow", "Crossbow", "Gun", "Relic", "Wand"];
        const offhand = ["Shield", "Offhand"];

        let bracketsDone = 0;
        if (Object.keys(wishlist) === null) { reject('wishlist is empty AF'); }
        Object.keys(wishlist).forEach(bracket => {
            if(bracket === 'locked') return;
            if(bracket === 'filterList') return;

            console.log(JSON.stringify(bracket));

            let allocationPoints, count = 0;
            let itemTypes = new Set();
            let nextMustBeNull = false;

            if (wishlist[bracket] !== null) {

                Object.keys(wishlist[bracket]).forEach(item => {

                    if (bracketsDone >= 4 || hunter && bracketsDone >= 3) {
                        if (item) {
                            itemIds.push(item.id);
                        }
                    } else {

                        if (nextMustBeNull && item !== null) {
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

                            if ((item.itemCategory === 'Reserved') || (item.itemCategory === 'Limited')) {
                                allocationPoints++;
                            }
                        }
                        if (allocationPoints > maxAllocationPoints) {
                            reject('bracket exceeds allocation points');
                        }
                        if (count > 6) {
                            reject('bracket has more than 6 items');
                        }
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