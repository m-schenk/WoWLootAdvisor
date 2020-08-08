const passport = require('passport');
const router = require('express').Router();

router.get('/login', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: process.env.ADDR + '/forbidden',
    successRedirect: process.env.ADDR + '/profile'
}), (req, res) => {
    res.send(req.user);
});

module.exports = router;
