const Item = require('../models/Wishlist');
const Wishlist = require('../models/Wishlist');
const bodyParser = require('body-parser');
const { validationResult } = require('express-validator');

exports.saveWishlist = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(406).json({ message: errors});
    }
    //const wishlist = new Wishlist({
    //    bracket1: [21608, 21670, 23031, 22939, 21635, 21664],
    //    bracket2: [21708, 23073, 21682, 21695, 21837, 21706],
    //    bracket3: [23038, 23047, 22730, 21585, 23054, 21582],
    //});

    const wishlist = new Wishlist({
        bracket1: req.body.bracket1,
        bracket2: req.body.bracket2,
        bracket3: req.body.bracket3
    })
    //console.log('hwefwef');
    
    wishlist.save()
    .then(wishlist => {
        //console.log(wishlist);
        console.log('wishlist has been saved');
        res.status(201).json({ message: 'wishlist has been saved' });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
}