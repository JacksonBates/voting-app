// user queries

var mongodb = require( 'mongodb' );

module.exports = {

  // GET /
  getPolls: function( req, res ) {
    var db = req.db;
    var polls = db.collection( 'polls' );
    polls.find().toArray( function( err, docs ) {
      if (err) {
        console.log( err );
      } else {
        res.render( 'pages/home', { docs: docs } );
      }
    });
  }
};