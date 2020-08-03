const express = require('express');

exports.isAuth = (req, res, next ) => {
    if(req.user) {
        next();
    } else {
        res.redirect(403, 'http://raegae.maarten.ch:3000/forbidden');
    }
}