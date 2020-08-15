const passport = require('passport');
const router = require('express').Router();

router.get('/login', passport.authenticate('discord'));
router.get('/redirect', (req, res, next) => {
    console.time('acrt');
    passport.authenticate('discord'), (err, user) => {
        console.timeEnd('acrt');
        console.log(err)
        if(user) {
            res.redirect(process.env.ADDR + '/profile');
        } else {
            res.redirect(process.env.ADDR + '/forbidden');
        }
    }
});

module.exports = router;
