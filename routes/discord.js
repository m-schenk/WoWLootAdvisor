const passport = require('passport');
const router = require('express').Router();

router.get('/login', passport.authenticate('discord'));
router.get('/redirect', () => {console.time('redirecttime')}, passport.authenticate('discord', {
    failureRedirect: process.env.ADDR + '/forbidden',
    successRedirect: process.env.ADDR + '/profile'
}), () => {console.timeEnd('redirecttime')}, (req, res) => {
    res.send(req.user);
});

module.exports = router;
