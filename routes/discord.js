const passport = require('passport');
const router = require('express').Router();

router.get('/login', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: 'http://raegae.maarten.ch:3000/forbidden',
    successRedirect: 'http://raegae.maarten.ch:3000/profile'
}), (req, res) => {
    res.send(req.user);
});

module.exports = router;
