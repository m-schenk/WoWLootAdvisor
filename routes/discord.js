const passport = require('passport');
const router = require('express').Router();

router.get('/login', passport.authenticate('discord'));
router.get('/redirect', (req, res, next) => {console.timeEnd('acrt'); next(); }, passport.authenticate('discord', {
    failureRedirect: process.env.ADDR + '/forbidden',
    successRedirect: process.env.ADDR + '/profile'
}));

module.exports = router;
