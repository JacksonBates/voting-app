//require( 'dotenv' ).config(); //Toggle comment off for Heroku deploy, on for local dev
var mongodb = require( 'mongodb' );
var mongo = mongodb.MongoClient;
var path = require( 'path' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var expressSession = require( 'express-session' );
var express = require( 'express' );
var app = express();
var passwordless = require('passwordless');

var MongoStore = require('passwordless-mongostore');
var email   = require("emailjs");


var mongoUserPsw = process.env.MONGO_USR_PSW;
var url = 'mongodb://' + mongoUserPsw + '@ds013206.mlab.com:13206/pollz';

mongo.connect( url, function( err, db ) {
  if ( err ) {
    console.log( 'Error: Could not connect to DB' );
  } else {
    console.log( 'Success: Connected to DB' );
 
    app.use( function( req, res, next ) {
      req.db = db;
      next();
    });

    // C&P from example pswless...
    // TODO: email setup (has to be changed)
    var yourEmail = 'tokendelivery.pollz@outlook.com';
    var yourPwd = process.env.OUTLOOK_PASSWORD;
    var yourSmtp = 'smtp-mail.outlook.com';
    var smtpServer  = email.server.connect({
      user:    yourEmail, 
      password: yourPwd,
      timeout: 60000, 
      host:    yourSmtp, 
      tls:     {ciphers: "SSLv3"}
    });

    // TODO: MongoDB setup (given default can be used)
    var pathToMongoDb = url;

    // TODO: Path to be send via email
    var host = 'https://pollz.herokuapp.com/';

    // Setup of Passwordless
    passwordless.init(new MongoStore(pathToMongoDb));
    passwordless.addDelivery(
        function(tokenToSend, uidToSend, recipient, callback) {
            var tokenLink = host + '?token=' + tokenToSend + '&uid=' + encodeURIComponent(uidToSend);
            // Send out token
            smtpServer.send({
              text:    'Hello!\nYou can now access your account here:' + tokenLink, 
              from:    yourEmail, 
              to:      recipient,
              subject: 'Token for ' + host,
              attachment: [
                {data:"<html>Hello!\nYou can now access your account here: <a href='" + tokenLink + "'>" + tokenLink + "</a></html>", alternative:true}
              ]
            }, function(err, message) { 
                if(err) {
                    console.log(err);
                }
                callback(err);
            });
        });
  // end C&P
    
    // Standard express setup
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(expressSession({secret: '42', saveUninitialized: false, resave: false, cookie: { maxAge: 60*60*24*365*10 }}));
    app.use( express.static( path.join( __dirname, '/public' )));
    
    // Passwordless middleware
    app.use(passwordless.sessionSupport());
    app.use(passwordless.acceptToken({ successRedirect: '/' }));

    app.use( '/', require( './routes' ));
  }
  app.set( 'port', ( process.env.PORT || 5000 ));
  app.set( 'views', path.join( __dirname, '/views' ));
  app.set( 'view engine', 'ejs' );
  
  app.listen( app.get( 'port' ), function() {
    console.log( 'Node app is running on port ', app.get( 'port' ) );
    
    });
});