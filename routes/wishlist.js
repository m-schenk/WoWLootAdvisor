const express = require('express');
const { check, body } = require('express-validator');
const Item = require('../models/Item');

const wishlistController = require('../controllers/wishlist');
const router = express.Router();


router.post('/save', [
    body()
    .custom((value, { req }) => {
        let result = isDuplicate(req.body.bracket1);

        //console.log('result:', result);
        
        if (result == true) {
            console.log('true');
        } else {
            console.log('false');
        }
        
        Item.findOne({ id: 21608 })
        .then(item => {
            //console.log('say someting', item);
        })
        
        
        return false;
    })



  
    
], wishlistController.saveWishlist);


module.exports = router;


function isDuplicate(bracket) {

    
    
    Item.find({ id: { $in: bracket } })
    .then(items => {
        items.forEach(element => {
            for (let i = 0; i < items.length; i++) {
                for (let j = 0; j < i; j++) {
                    if (items[i] == items[j]) {
                        return false;
                    } 
                    return true;
                }
            }
        });
    })
}

// dont allow 3 items at the very bottom


// no duplicate item types
// allow only 3 allocation points per bracket
// reserved items use two items slots
// check maxiumum bracket size -> 6