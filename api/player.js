const Player = require('../models/Player');
const fetch = require('node-fetch');

exports.isAuth = (req, res, next) => {
    res.sendStatus(200)
}
