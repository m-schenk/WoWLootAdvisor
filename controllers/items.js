const Item = require('../models/Item');

exports.getMockData = (req, res, next) => {
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
}

exports.modify = (req, res, next) => {

    const item = req.body;

    console.log(item);
    
    if (item.itemCategory) {

        Item.update({id: req.body.id}, {
            $set: {
                itemCategory: req.body.itemCategory
            }
        })
        .then(item => {
            res.status(201).json({
                message: 'new category has been set',
                value: req.body.itemCategory
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
    }

    if (item.priority) {
        Item.update({id: req.body.id}, {
            $set: {
                priority: req.body.priority
            }
        })
        .then(item => {
            res.status(201).json({
                message: 'new priority has been set',
                value: req.body.itemCategory
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
    }
}

exports.getQuery = (req, res, next) => {

    let query = req.query.query;
    let regex = new RegExp(query, "i");
    
    Item.find({name: regex})
    .sort({ name: 1})
    .or([{ itemCategory: 'Reserved' }, { itemCategory: 'Limited' }, { itemCategory: 'Unlimited' }]) //dumb way to filter "Unlockable" itemCategory but couldn't find a "not" function
    .limit(16)
    .then(item => {
        res.status(200).json({
            results: item,
            statusText: "OK"
        })
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}

exports.getItemById = (req, res, next) => {

    const itemId = req.params.id;

    Item.findOne({ id: itemId })
    .then(item => {
        //console.log(item);
        
        res.status(200).json({ item: item });
    })
}
