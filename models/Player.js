const mongoose = require('mongoose');
const WishlistSchema = require('./Wishlist')

const PlayerSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    class: { type: String, required: true },
    race: { type: String, required: true },
    talent: { type: String, required: true },
    aq_attendance: { type: Number, required: false },
    naxx_attendance: { type: Number, required: false },
    wishlist: {type: mongoose.Schema.Types.ObjectId, ref: 'WishlistSchema', required: true},
});

module.exports = mongoose.model('Player', PlayerSchema);
