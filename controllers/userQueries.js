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
    var result = polls.find( { _id: ObjectId(pollID) } ).toArray(function(err, docs) {
      if (err) {
        console.log("Aw! Snap!");
      } else {
        res.render( 'pages/results', { result: docs[0], user: req.user });
        // console.log(docs[0]);
      }
    });
  }

};