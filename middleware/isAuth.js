const express = require('express');

exports.isAuth = (req, res, next ) => {
    if(req.user) {
        next();
    } else {
        res.redirect(403, process.env.ADDR + '/login');
    }
}