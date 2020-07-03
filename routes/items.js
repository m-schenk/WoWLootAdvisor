const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

/* GET users listing. */
router.get('', function(req, res, next) {
    console.log(req.query.query);
  res.json([{
        "id": "21650",
        "name": "Ancient Qiraji Ripper"
    },
    {
        "id": "22737",
        "name": "Atiesh, Greatstaff of the Guardian"
    },
    {
        "id": "23038",
        "name": "Band of Unnatural Forces"
    }]);
});

router.get('/test', function(req, res, next) {
    const item = new Item({

        id: 12345,
        name: 'Blade of Abortion',
        itemType: 'Pole',
        itemCategory: 'Limited',
        raid: 'AQ40',
        encounters: ['Boss1', 'Trash1', 'Trash2'],
        priority: [
            {classes: ['Mage', 'Warlock']},
            {classes: ['Warrior', 'Paladin']}
        ],

    })

    item.save()
    .then(item => {
        console.log('Object saved');
        res.status(200).json({message: 'success', item: item});
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
});





module.exports = router;
