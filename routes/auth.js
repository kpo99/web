var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.server.controller');
var passport = require('passport');

/* GET auth listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signUp', function(req, res, next) {
  res.render('signUp');
});

router.get('/signIn', function(req, res, next) {
  res.render('signIn');
});



/* POST auth listing. */



module.exports = router;
