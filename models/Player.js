const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    discordId: { type: Number, required: false },
    name: { type: String, required: false },
    class: { type: String, required: false },
    race: { type: String, required: false },
    role: { type: String, required: false },
    permissions: { type: String, required: false },
    aq_attendance: { type: Number, required: false },
    naxx_attendance: { type: Number, required: false },
    wishlist: { type: Schema.Types.ObjectId, ref: 'Wishlist', required: false }
});

module.exports = mongoose.model('Player', PlayerSchema);
