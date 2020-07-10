const express = require('express');
const { check, body } = require('express-validator');

const wishlistController = require('../controllers/wishlist');
const router = express.Router();


router.post('/save', [
    body()
    .custom((value, {req}) => {

        const b1Length = req.body.bracket1.length;
        const b2Length = req.body.bracket2.length;
        const b3Length = req.body.bracket3.length;

        if (b1Length != 6 || b2Length != 6 || b3Length != 6)
        {
            throw new Error('Invalid bracket: Not all slots filled');
        }
        return true;
    })
    //.custom(bracket => {
    //    if (bracket.length <= 6)
    //    {
    //        throw new Error('invalid bracket');
    //    }
    //    
    //})
    
], wishlistController.saveWishlist);


module.exports = router;