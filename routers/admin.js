var router = module.exports = require('express').Router(),
	User = require('../models/user');

router.route('/').all(function(req, res, next){
	if(req.user){
		next();
	} else {
		res.redirect('/login');
	}
});