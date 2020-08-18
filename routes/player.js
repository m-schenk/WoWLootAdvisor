const express = require('express');
const router = express.Router();

const playerApi = require('../api/player');

router.post('/saveProfile', playerApi.validate('saveProfile'), playerApi.saveProfile);
router.get('/loadProfile', playerApi.loadProfile);
router.get('/logout', playerApi.logout);
router.post('/saveWishlist', playerApi.validate('saveWishlist'), playerApi.saveWishlist);
router.get('/loadWishlist', playerApi.loadWishlist);

router.get('/id::id', playerApi.getPlayerById);

module.exports = router;
