/**
 * Created by Peter on 17.11.2016.
 */
var express = require('express');
var router = express.Router();
var userCtrl = require('../../controllers/user.server.controller');
var passport = require('passport');
var jsonStatus = require('../../config/status')


router.post('/signUp', function(req, res, next) {
    if (req.body.password === req.body.passwordConfirm) {
        userCtrl.create(req, res)
            .then(userObj => res.json(userObj))
            .catch(err=>res.json(err));
    }
    else
        res.status(400).json(jsonStatus.pass_no_match);
});
router.get('/logOut',function(req,res){
    if (req.user) {
        req.logout();
        res.json(jsonStatus.logOut_success);
    }
    else
        res.status(401).json(jsonStatus.not_authorized);
});
router.post('/logIn', passport.authenticate('local'),
    function(req,res){
        res.json(req.user);
});

router.get('/isAuthorized', function(req,res){
    if (req.user)
        res.status(200).json(jsonStatus.authorized)
    else
        res.status(401).json(jsonStatus.not_authorized);
});

module.exports = router;