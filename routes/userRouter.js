/**
 * Created by Peter on 13.11.2016.
 */
var express = require('express');
var router = express.Router();
var courseCtrl = require('../controllers/course.server.controller');
var values = require('../config/values');
var jsonStatus = require('../config/status');

/* GET home page. */
router.get('/addCourse', function(req, res, next) {
    if (req.user){
        if(req.user.role === 'teacher')
            res.render('courseAdd');
        else if(req.user.role === 'user')
            res.render('subscribeTest');
        else
            res.end('Wrong role');  // fix later
    }
    else
       res.end('not authorized');
});

router.get('/courseDelete', function(req, res, next) {
    res.render('courseDelete');
});

router.get('/', function(req, res, next) {
    if (req.user) {
        res.render('profile');
    }
    else
        res.status(values.not_authorized).json(jsonStatus.not_authorized);
});

router.get('/updatePassword', function(req, res, next) {
    if (req.user) {
        res.render('changePassword');
    }
    else
        res.status(values.not_authorized).json(jsonStatus.not_authorized);
});

router.get('/update', function(req, res, next) {
    res.render('userUpdate');
});



router.get('/updateCourse', function(req, res, next) {
    res.render('courseUpdate');
});

router.get('/generateCourse', function(req, res, next) {
    res.render('generate');
});
router.get('/addLab', function(req, res, next) {
    if(req.user) {
        if(req.user.role === 'teacher')
            res.render('addLab');
        else if(req.user.role ==='user')
            res.render('labSubscribe');
        else
            res.status(values.not_authorized).json(jsonStatus.inappropriate_role);
    }
    else
        res.status(values.not_authorized).json(jsonStatus.not_authorized);
});



module.exports = router;
