const mongoose = require('mongoose');
const WishlistSchema = require('./Wishlist')

const PlayerSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: false },
    class: { type: String, required: false },
    race: { type: String, required: false },
    talent: { type: String, required: false },
    aq_attendance: { type: Number, required: false },
    naxx_attendance: { type: Number, required: false },
    wishlist: {type: mongoose.Schema.Types.ObjectId, ref: 'WishlistSchema', required: false},
});

module.exports = mongoose.model('Player', PlayerSchema);
