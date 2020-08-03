const passport = require('passport');
const router = require('express').Router();

router.post('/login', passport.authenticate('discord'));
router.post('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '../../profile'
}), (req, res) => {
    res.send(req.user);
});

module.exports = router;
