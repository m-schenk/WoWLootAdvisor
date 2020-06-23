const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();


router.get('/admin', adminController.getDashboard);
router.post('/admin/update', adminController.update);


module.exports = router;