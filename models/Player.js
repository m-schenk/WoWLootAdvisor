const mongoose = require('mongoose');
const WishlistSchema = require('./Wishlist')

const PlayerSchema = new mongoose.Schema({
    discordId: { type: Number, required: false },
    name: { type: String, required: false },
    class: { type: String, required: false },
    race: { type: String, required: false },
    role: { type: String, required: false },
    permissions: { type: String, required: false },
    aq_attendance: { type: Number, required: false },
    naxx_attendance: { type: Number, required: false },
    wishlist: {
        locked: { type: Boolean },
        bracket1: [{
            type: Number,
        }],
        bracket2: [{
            type: Number,
        }],
        bracket3: [{
            type: Number,
        }],
        bracket4: [{
            type: Number,
        }],
        bracketLess: [{
            type: Number,
        }]
    },
});

module.exports = mongoose.model('Player', PlayerSchema);
