var express = require( 'express' );
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var mongodb = require( 'mongodb' );
var userQueries = require( './controllers/userQueries' );

// Homepage for the app, 
router.get( '/', userQueries.getPolls );

module.exports = router;
