var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var test = require('../generator/test');

/* GET home page. */

router.get('/profile1', function(req, res, next) {
  if (req.user)
      res.end('Hello' + req.user.username);
});

module.exports = router;
