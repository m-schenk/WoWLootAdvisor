const Item = require("../models/Item");

exports.modify = (req, res, next) => {
    const item = req.body;

    console.log(item);

    if (item.itemCategory) {
        Item.update(
            { id: req.body.id },
            {
                $set: {
                    itemCategory: req.body.itemCategory,
                },
            }
        )
            .then((item) => {
                res.status(201).json({
                    message: "new category has been set",
                    value: req.body.itemCategory,
                });
            })
            .catch((err) => {
                const error = new Error(err);
                error.message = "Failed to update item (controllers/items modify())";
                error.httpStatusCode = 500;
                return next(error);
            });
    }

    if (item.priority) {
        Item.update(
            { id: req.body.id },
            {
                $set: {
                    priority: req.body.priority,
                },
            }
        )
            .then((item) => {
                res.status(201).json({
                    message: "new priority has been set",
                    value: req.body.itemCategory,
                });
            })
            .catch((err) => {
                const error = new Error(err);
                error.message = "Failed to update item (controllers/items modify())";
                error.httpStatusCode = 500;
                return next(error);
            });
    }
};

exports.getQuery = (req, res, next) => {
    let query = req.query.query;
    let regex = new RegExp(query, "i");

    Item.find({ name: regex })
        .sort({ name: 1 })
        .limit(15)
        .or([
            { itemCategory: "Reserved" },
            { itemCategory: "Limited" },
            { itemCategory: "Unlimited" },
        ]) //dumb way to filter "Unlockable" itemCategory but couldn't find a "not" function
        .then((item) => {
            res.status(200).json({
                results: item,
                statusText: "OK",
            });
        })
        .catch((err) => {
            const error = new Error(err);
            error.message =
                "Failed to fetch item from database (controllers/items getQuery())";
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getItemById = (req, res, next) => {
    const itemId = req.params.id;

    Item.findOne({ id: itemId })
        .then((item) => {
            res.status(200).json({ item: item });
        })
        .catch((err) => {
            const error = new Error(err);
            error.message =
                "Failed to fetch player from database (controllers/items getItemById())";
            error.httpStatusCode = 500;
            return next(error);
        });
};
