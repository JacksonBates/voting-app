var express = require( 'express' );
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var mongodb = require( 'mongodb' );
var ObjectId = require('mongodb').ObjectID;
var userQueries = require( './controllers/userQueries' );
var passwordless = require('passwordless');
// var passwordless = require('../../../');

// Homepage for the app, 
router.get( '/', userQueries.getPolls );

// GET results page for selected poll
router.get( '/results/:POLLID', function( req, res ) {
	var pollID = req.params.POLLID;
	var db = req.db;
	var polls = db.collection( 'polls' );
	var result = polls.find( { _id: ObjectId(pollID) } ).toArray(function(err, docs) {
		if (err) {
			console.log("Aw! Snap!");
		} else {
   	  res.render( 'pages/results', { result: docs[0], user: req.user });
			// console.log(docs[0]);
		}
	});
});

  // Promise nonsense I do not understand 
	// 
	// var promise = new Promise( function( resolve, reject) {
	// 	var result = polls.findOne( { _id: pollID } );
  //   if (result) {
	// 		resolve(result);
	// 	} else {
	// 		reject(Error("Aw, snap!"));
	// 	}
	// });
	// promise.then(function(result) { 
	// 	console.log(result);
	// 	res.render( 'pages/results', { result: result, user: req.user });
	// }, function(err) {
	// 	console.log(err);
	// });
	// }
	// );

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
