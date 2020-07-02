const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    bracket1: [{type: Number, required: true, validate: {
        validator: bracketLimitChecker(v),
        message: props => `${props.value} is not a valid bracket 1!`
    } }],
    bracket2: [{type: Number, required: true, validate: {
        validator: bracketLimitChecker(v),
        message: props => `${props.value} is not a valid bracket 2!`
    } }],
    bracket3: [{type: Number, required: true, validate: {
        validator: bracketLimitChecker(v),
        message: props => `${props.value} is not a valid bracket 3!`
    } }],
    bracket4: [{type: Number, required: false, validate: { //hunter does not have this bracket
        validator: bracketLimitChecker(v),
        message: props => `${props.value} is not a valid bracket 4!` 
    } }],
    bracketless: [{type: Number, required: true}],
});

function bracketLimitChecker(v) {
    return v.length === 6;
}

module.exports = mongoose.model('Wishlist', WishlistSchema);
