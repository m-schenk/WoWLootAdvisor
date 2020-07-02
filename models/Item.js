const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    id: { type: Number, required: true},
    name: { type: String, required: true },
    itemType: { type: String, required: true },
    itemCategory: { type: String, required: true },
    raid: { type: String, required: true },
    encounters: [{ type: String, required: true }],
    priority: [{
        classes: [{ type: String, require: true}],
    }],
});

module.exports = mongoose.model('Item', ItemSchema);
