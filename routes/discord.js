const passport = require('passport');
const router = require('express').Router();

router.get('/login', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: process.env.PTR_ADDR + '/login',
    successRedirect: process.env.PTR_ADDR + '/profile'
}));

module.exports = router;
