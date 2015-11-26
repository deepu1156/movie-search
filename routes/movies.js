var express = require('express');
var router = express.Router();

module.exports = function(db) {
  router.get('/', function(req,res,next){
    var cursor = db.collection('movies').find().limit(5);    
    cursor.toArray(function(err,items){
      res.send(items);  
    });    
  });
  return router;  
};