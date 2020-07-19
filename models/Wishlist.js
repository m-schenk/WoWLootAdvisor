const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    locked: { type: Boolean },
    bracket1: [{
        type: Number,
        required: true
    }],
    bracket2: [{
        type: Number,
        required: true
    }],
    bracket3: [{
        type: Number,
        required: true
    }],
    bracket4: [{
        type: Number,
        required: true
    }],
    bracketLess: [{
        type: Number,
        required: true
    }]
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
