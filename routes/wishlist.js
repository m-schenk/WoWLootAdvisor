const express = require('express');
const { check, body } = require('express-validator');
const Item = require('../models/Item');
const Player = require('../models/Player');

const wishlistController = require('../controllers/wishlist');
const router = express.Router();
const isAuth = require('../middleware/is-auth'); //use this middleware in each route that should only be accessible when authenticated


router.post('/save', [
    body()
    .custom((value, { req }) => {

        // let isHunter = false;
        
        // // swap this block with the block below if the class property should be fetched from the db instead
        // if (value.class == 'Hunter') {
        //     isHunter = true;
        // }
        // ------------------------------------------------------------------------
        // Player.find({ id: req.session.playerId })
        // .then(player => {
        //   if (player.class == 'Hunter') {
        //     isHunter = true;
        //   }
        // })
        // ------------------------------------------------------------------------

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
], wishlistController.saveWishlist);

// router.get('/save', wishlistController.saveWishlist); // use for debug

module.exports = router;

function checkBracket(bracket, bracketLess) {  

  return new Promise((resolve, reject) => {
        
    Item.find({
      'id': { $in: [
        ...bracket  // ... selects all elements inside the array
      ]}
    })
    .then(result => {
    // console.log('bracket result', result);

    //   if (result.length < 6) {
    //     reject('Duplicate item Id or Bracket is missing item(s)')
    //   }
                
      let allocationPoints = 0;   // should not exceed 3
      let itemSlots = 0;          // should not exceed 2
      let occupiedSlots = 0;      // should not exceed 6

      for (i = 0; i < result.length; i ++) {
        for (j = 0; j < i; j++) {
          if (i == j) continue;
          if (result[i].itemType == result[j].itemType) {
            // console.log(result[i].itemType, '==', result[j].itemType);
            reject('Bracket has duplicate item types');
          }
        }
        
        if (result[i].id && !bracketLess) {
          occupiedSlots++;
        }
        if (result[i].itemCategory == 'Reserved' || result[i].itemCategory == 'Limited') {
          allocationPoints++;
          if (result[i].itemCategory == 'Reserved') {
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
        if (result[i].itemCategory == 'Unlockable') {
          reject('Might of the Scourge, Power of the Storm and Splinter of Atiesh are forbidden items');
        }
      }
      resolve('Wishlist is valid!');
    })
    .catch(err => {
      const error = new Error(err);
      error.message = 'Failed to fetch one or more items from the submitted wishlist brackets (routes/wishlist checkBracket())'
      error.httpStatusCode = 500;
      return next(error);
    });
  })
}

// if item is unlimited
// dont allow unlockable items (itemCategory == 'Unlockable')
// no duplicate item types
// allow only 3 allocation points per bracket
// reserved items use two items slots
// check maxiumum bracket size -> 6