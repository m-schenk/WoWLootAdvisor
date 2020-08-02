const discordApi = require('../api/discord');
const passport = require('passport');

const router = require('express').Router();

router.get('/login', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden'
}), (req, res) => {
    res.status(200).json({ player: req.player });
});

module.exports = router;
