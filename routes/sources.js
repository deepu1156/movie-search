var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var sources = [
    {id: 1, name: "iTunes"},
    {id: 2, name: "HBO"},
    {id: 3, name: "VUDU"},
    {id: 4, name: "Amazon"}
  ];
  res.send(sources);
});

module.exports = router;
