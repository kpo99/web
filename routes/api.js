/**
 * Created by Peter on 17.11.2016.
 */
var express = require('express');
var router = express.Router();
var apiAuthRouter = require('./api/api.auth');
var apiCoursesRouter = require('./api/api.courses');
var apiUserRouter = require('./api/api.user');


router.use('/auth',apiAuthRouter);
router.use('/courses',apiCoursesRouter);
router.use('/user',apiUserRouter);


module.exports = router;