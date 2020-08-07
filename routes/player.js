const express = require('express');
const router = express.Router();

const playerApi = require('../api/player');

const Item = require('../models/Item');

router.post('/postPlayerProfile', playerApi.validate('postPlayerProfile'), playerApi.postPlayerProfile);
router.get('/getPlayerProfile', playerApi.getPlayerProfile);
router.get('/logout', playerApi.logout);
router.post('/saveWishlist', (req, res, next) => {console.log(req.body); next();},playerApi.validate('postSaveWishlist'), playerApi.postSaveWishlist);

router.get('/id::id', playerApi.getPlayerById);

module.exports = router;
