/**
 * Created by Peter on 13.11.2016.
 */
var express = require('express');
var router = express.Router();
var courseCtrl = require('../controllers/course.server.controller');

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

router.get('/', function(req, res, next) {
    res.render('courseDelete');
});





router.get('/updateCourse', function(req, res, next) {
    res.render('courseUpdate');
});

router.get('/generateCourse', function(req, res, next) {
    res.render('generate');
});
router.get('/addLab', function(req, res, next) {
    res.render('addLab');
});



module.exports = router;
