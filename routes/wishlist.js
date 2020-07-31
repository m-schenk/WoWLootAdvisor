const express = require('express');
const { check, body } = require('express-validator');
const Item = require('../models/Item');

const wishlistController = require('../controllers/wishlist');
const router = express.Router();


router.post('/save', [
    body()
    .custom((value, { req }) => {

            const p = Promise.all([
                checkBracket(value.bracket1),
                checkBracket(value.bracket2),
                checkBracket(value.bracket3),
                checkBracket(value.bracket4),
                checkBracket(value.bracketLess, true)
            ])
            return p.then(result => {
                console.log(result);
            })
    })
], wishlistController.saveWishlist);

module.exports = router;





function checkBracket(bracket, bracketLess) {  

  return new Promise((resolve, reject) => {
        
    Item.find({
      'id': { $in: [
        bracket[0],
        bracket[1],
        bracket[2],
        bracket[3],
        bracket[4],
        bracket[5],
        bracket[6]
      ]}
    })
    .then(result => {
    //console.log('bracket result', result);
      let allocationPoints = 0;   // should not exceed 3
      let itemSlots = 0;          // should not exceed 2
      let occupiedSlots = 0;      // should not exceed 6

      for (i = 0; i < result.length; i ++) {
        for (j = 0; j < i; j++) {
          if (i == j) continue;
          if (result[i].itemType == result[j].itemType) {
            //console.log(result[i].itemType, '==', result[j].itemType);
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
      console.log(err);
    })
  })
}

// if item is unlimited



// dont allow unlockable items (itemCategory == 'Unlockable')


// no duplicate item types
// allow only 3 allocation points per bracket
// reserved items use two items slots
// check maxiumum bracket size -> 6