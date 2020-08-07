const express = require('express');
const router = express.Router();

const playerApi = require('../api/player');

const Item = require('../models/Item');

router.post('/postPlayerProfile', (req, res, next) => {console.log(req.body); next();}, playerApi.validate('postPlayerProfile'), playerApi.postPlayerProfile);
router.get('/getPlayerProfile', playerApi.getPlayerProfile);
router.get('/logout', playerApi.logout);
router.post('/saveWishlist', (req, res, next) => {
    console.log(req.body); 
    req.body.wishlist.bracket2[0].itemCategory = 'Reserved';
    req.body.wishlist.bracket2[1].itemCategory = 'Reserved';
    req.body.wishlist.bracket2[2].itemCategory = 'Limited';
    next();
},playerApi.validate('postSaveWishlist'), playerApi.postSaveWishlist);

router.get('/id::id', playerApi.getPlayerById);

module.exports = router;
