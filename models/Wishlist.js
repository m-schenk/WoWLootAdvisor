const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    'locked': { type: Boolean, required: false },
    'bracket-1': {
        itemTypes: [{ type: String, required: false }],
        'slot-1': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-2': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-3': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-4': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-5': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-6': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        points: { type: Number, required: false },
    },
    'bracket-2': {
        itemTypes: [{ type: String, required: false }],
        'slot-1': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-2': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-3': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-4': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-5': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-6': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        points: { type: Number, required: false },
    },
    'bracket-3': {
        itemTypes: [{ type: String, required: false }],
        'slot-1': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-2': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-3': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-4': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-5': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-6': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        points: { type: Number, required: false },
    },
    'bracket-4': {
        itemTypes: [{ type: String, required: false }],
        'slot-1': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-2': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-3': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-4': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-5': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-6': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        points: { type: Number, required: false },
    },
    'bracketless': {
        'slot-1': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-2': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-3': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-4': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-5': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-6': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-7': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-8': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-9': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-10': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-11': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-12': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-13': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-14': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-15': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-16': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-17': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-18': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-19': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-20': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-21': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-22': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-23': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-24': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-25': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-26': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-27': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-28': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-29': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-30': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-31': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
        'slot-32': { item: { type: Schema.Types.ObjectId, ref: 'Item', required: false } },
    }
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
