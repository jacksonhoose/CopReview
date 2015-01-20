var router = module.exports = require('express').Router(),
	User = require('../models/user'),
	passport = require('passport');

/*!
 * Login
 */
router.route('/login')
	.get(function(req, res, next){
		res.render('auth/login.jade', {
			title: 'Login'
		});
	})
	.post(passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));

/*!
 * Register
 */
router.route('/register')
	.get(function(req, res, next){
		res.render('auth/register.jade', {
			title: 'Register'
		});
	})
	.post(function(req, res, next){
		var username = req.param('username');
		var password = req.param('password');

		var query = User.where({
			username: username
		});
		
		query.findOne(function(err, user){
			
			if(user){
				res.send('user already exists');
			}

			var user = new User({
				username: username,
				password: password
			});

			user.save(function(err, user){
				res.render('auth/login.jade', {
					message: 'User created.'
				});
			});
			
		});
	});

/*!
 * Logout
 */
router.get('/logout', function(req, res, next){
	req.logout();
	res.redirect('/');
});