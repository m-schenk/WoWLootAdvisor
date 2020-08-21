const createError = require('http-errors');

const Item = require('../models/Item');

exports.validate = (method) => {
    switch (method) {
        case 'getQuery': {
            return [
                query('query', 'error on query validation').exists().isLength({ max: 50 }).notEmpty().trim().escape(),
            ]
        }
    }
}

exports.modify = (req, res, next) => {
    const item = req.body; //prob. not working like this.. but function is not needed anywhere right now

    if (item.itemCategory) {
        Item.update({ id: req.body.id }, {
            $set: {
                itemCategory: req.body.itemCategory
            }
        }).then(item => {
            res.status(201).json({
                message: 'new category has been set',
                item: item,
                value: item.itemCategory
            });
        }).catch(err => {
            return next(createError(500, 'Failed to update item category (api/items modify), error text: ' + err));
        });
    }
    if (item.priority) {
        Item.update({ id: req.body.id }, {
            $set: {
                priority: req.body.priority
            }
        }).then(item => {
            res.status(201);
            res.set({ 'Content-Type': 'text/json' });
            res.json({
                message: 'new priority has been set',
                item: item,
                value: item.priority
            });
            res.end();
        }).catch(err => {
            return next(createError(500, 'Failed to update item priority (api/items modify), error text: ' + err));
        });
    }
    // ???
}

exports.getQuery = (req, res, next) => {
    //db.items.ensureIndex( { 'name' : 'text' } ,{ score: {$meta:'textScore'}}) 
    let regex = new RegExp(req.query.query, "i");

    // Item.find({ name: regex })
    //     .sort({ name: 1 }) //sort items that startswith is stronger than alphabetical //remove class locked items
    Item.find({ $text: { $search: req.query.query } },
        { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } })
        .limit(15)
        .or([{ itemCategory: 'Reserved' }, { itemCategory: 'Limited' }, { itemCategory: 'Unlimited' }]) //dumb way to filter "Unlockable" itemCategory but couldn't find a "not" function
        .then(items => {
            res.status(200);
            res.set({ 'Content-Type': 'text/json' });
            res.json({ results: items });
            res.end();
        }).catch(err => {
            return next(createError(500, 'Failed to resolve item query (api/items getQuery()), error text: ' + err));
        });
}

exports.getItemById = (req, res, next) => {
    Item.findOne({ id: req.params.id })
        .then(item => {
            res.status(200);
            res.set({ 'Content-Type': 'text/json' });
            res.json({ item: item });
            res.end();
        }).catch(err => {
            return next(createError(500, 'Failed to fetch item from database (api/items getItemById()), error text: ' + err));
        });
}
