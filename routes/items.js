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

        id: 123,
        name: 'name',
        itemType: 'sword',
        itemCategory: 'limited',
        raid: 'aq30',
        encounters: ['wserghiou'],
        sdfghjk: 'lalala',
        priority: [
            {classes: ['serghuil']}
        ],

    })

    item.save()
    .then(result => {
        console.log('Object saved');
        res.status(200);
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
});



module.exports = router;
