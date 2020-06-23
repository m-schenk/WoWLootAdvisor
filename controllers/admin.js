


exports.getDashboard = (req, res, next) => {
    res.render('admin/dashboard', {
        pageTitle: 'Dashboard'
    });
};


