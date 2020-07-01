const mongoose = require('mongoose');
const WishlistSchema = require('./Wishlist')

const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: { type: String, required: true },
    class: { type: String, required: true },
    race: { type: String, required: true },
    talent: { type: String, required: true },
    aq_attendance: Number,
    naxx_attendance: Number,
    wishlist: {type: Schema.Types.ObjectId, ref: 'WishlistSchema', required: true}
});

module.exports = mongoose.model('Player', PlayerSchema);