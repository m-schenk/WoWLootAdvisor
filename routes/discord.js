const passport = require('passport');
const router = require('express').Router();

router.get('/login', passport.authenticate('discord'));
router.get('/redirect', (req, res, next) => {console.time('redirecttime'); next();}, passport.authenticate('discord', {
    failureRedirect: process.env.ADDR + '/forbidden',
    successRedirect: process.env.ADDR + '/profile'
}), (req, res, next)  => {console.timeEnd('redirecttime'); next();}, (req, res) => {
    res.send(req.user);
});

module.exports = router;
