var express = require( 'express' );
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var mongodb = require( 'mongodb' );
var userQueries = require( './controllers/userQueries' );
var passwordless = require('passwordless');
// var passwordless = require('../../../');

// Homepage for the app, 
router.get( '/', userQueries.getPolls );

// GET results page for selected poll
router.get( '/results/:POLLID', userQueries.getResult );

/* GET restricted site. */
router.get( '/restricted', passwordless.restricted(),
 function( req, res ) {
  res.render( 'pages/restricted' , { user: req.user });
});

/* GET login screen. */
router.get( '/login' , function( req, res ) {
  res.render( 'pages/login', { user: req.user });
});

/* GET logout. */
router.get('/logout', passwordless.logout(),
	function(req, res) {
  res.redirect('/');
});

/* POST login screen. */
router.post('/sendtoken', 
	passwordless.requestToken(
		// Simply accept every user
		function(user, delivery, callback) {
			callback(null, user);
			// usually you would want something like:
			// User.find({email: user}, callback(ret) {
			// 		if(ret)
			// 			callback(null, ret.id)
			// 		else
			// 			callback(null, null)
			// })
		}),
	function(req, res) {
  		res.render('pages/sent', { user: req.user });
});

module.exports = router;
