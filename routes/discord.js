const passport = require('passport');
const router = require('express').Router();
const connectEnsureLogin = require('connect-ensure-login');


router.get('/login', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: 'http://raegae.maarten.ch:3000/forbidden',
    successRedirect: 'http://raegae.maarten.ch:3000/profile'
}), (req, res) => {
    res.send(req.user);
});
router.get('/isauth', connectEnsureLogin.ensureLoggedIn('http://raegae.maarten.ch:3000/forbidden'), (req, res) => {
    res.sendStatus(200)
})

module.exports = router;
