// user queries

var mongodb = require( 'mongodb' );
var ObjectId = require('mongodb').ObjectID;


module.exports = {

  // GET /
  getPolls: function( req, res ) {
    var db = req.db;
    var polls = db.collection( 'polls' );
    polls.find().toArray( function( err, docs ) {
      if (err) {
        console.log( err );
      } else {
        res.render( 'pages/home', { docs: docs, user: req.user } );
      }
    });
  },

  // GET /results/:POLLID
  getResult: function( req, res ) {
    var pollID = req.params.POLLID;
    var db = req.db;
    var polls = db.collection( 'polls' );
    var result = polls.find( { _id: ObjectId( pollID )}).toArray(function(err, docs) {
      if (err) {
        console.log("Aw! Snap!");
      } else {
        res.render( 'pages/results', { result: docs[0], user: req.user });
        // console.log(docs[0]);
      }
    });
  },

  // GET /vote/:POLLID
  getVote: function( req, res ) {
    var pollID = req.params.POLLID;
    var db = req.db;
    var polls = db.collection( 'polls' );
    var poll = polls.find( { _id: ObjectId( pollID )}).toArray( function( err, docs ) {
      if (err) {
        console.log( "Aw! Snap!" );
      } else {
        res.render( 'pages/vote', {poll: docs[0], user: req.user });
      }
    });
  },

  // POST /vote
  postVote: function( req,res ) {
    var db = req.db;
    var pollID = req.body.pollID;
    var option = req.body.voteOptions;
    var arrayPositionUpdate = {};
    var key = 'voteCount.' + option;
    arrayPositionUpdate[key] = 1;
    console.log( arrayPositionUpdate, typeof arrayPositionUpdate );
    var user = req.body.username;
    var polls = db.collection( 'polls' );
    polls.update( 
      { _id: ObjectId( pollID ) }, 
      { 
        $inc: arrayPositionUpdate,
        $push: { "voters" : user } 
      }
    );
    res.redirect( '/results/' + pollID );
  },

  // GET /poll
  newPoll: function( req, res ) {
    res.render( 'pages/poll', { user: req.user } );
  },

  // POST /poll
  postPoll: function( req, res ) {
    var db = req.db;
    var poll = req.body.title;
    var creator = req.body.creator;
    var createdTime = req.body.dateStamp;
    var optionsArray = [];
    var voteCountArray = [];
    for (var item in req.body) {
      optionsArray.push(req.body[item]);
    }
    optionsArray = optionsArray.slice(3);
    for (var count = 0; count < optionsArray.length; count++) {
      voteCountArray.push(0);
    }
    var polls = db.collection( 'polls' );
    polls.insert({ 
      poll: poll,
      creator: creator,
      createdTime: createdTime,
      options: optionsArray,
      voteCount: voteCountArray,
      voters: []
    }, function( err, docs ) {
      if (err) {
        console.log( 'Aw, snap!' );
      } else {
        res.redirect( 'pages/vote', { poll: docs[0], user: req.user } );
      }
    });
  },

  getUserPolls: function( req, res ) {
    var db = req.db;
    var user = req.user;
    var polls = db.collection( 'polls' );
    polls.find( { creator: user } ).toArray( function( err, docs ) {
      if (err) {
        console.log( 'Aw, snap!' ); 
      } else {
        res.render( 'pages/my', { user: user, polls: docs } )
      }
    })
  }


};