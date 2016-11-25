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
            .then(status => res.json(status))
            .catch(err=>res.json(err));
    }
    else
        res.status(400).json(jsonStatus.pass_no_match);
});

router.post('/logIn', passport.authenticate('local',{
    failureRedirect: '/api/auth/logIn'
}),function(req,res){
    res.redirect('/profile');
});

module.exports = router;