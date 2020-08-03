const passport = require('passport');
const router = require('express').Router();

router.get('/login', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '../../profile'
}), (req, res) => {
    res.send(req.user);
});

module.exports = router;
