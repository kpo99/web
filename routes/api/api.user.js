/**
 * Created by Peter on 17.11.2016.
 */
"use strict";
var express = require('express');
var router = express.Router();
var courseCtrl = require('../../controllers/course.server.controller');
var values = require('../../config/values');
var jsonStatus = require('../../config/status');
var validator = require('../../config/validator');
var generator = require('../../generator/test');
var userCtrl = require('../../controllers/user.server.controller');

router.post('/course', function(req, res, next) {
    if (req.user){
        if(req.user.role === 'teacher') {
            courseCtrl.course_create(req, res)
                .then(status=>res.json(status))
                .catch((err)=>res.status(err[0]).json(err[1]));
        }
        else if(req.user.role === 'user'){
            courseCtrl.course_subscribe(req)
                .then(status => res.json(status))
                .catch(err => res.status(err[0]).json(err[1]));
        }
        else
            res.status(values.not_authorized).json(jsonStatus.inappropriate_role);
    }
    else
        res.status(values.not_authorized).json(jsonStatus.inappropriate_role);
});

router.get('/course',function(req,res){
    if(req.user){
        if(req.query.offset && req.query.size){
            if(validator.isNumber(req.query.offset) && validator.isNumber(req.query.size)){
                let where = {};
                where.user_id = req.user._id;
                if(req.query.year){
                    if (validator.isNumber(req.query.year))
                        where.year = parseInt(req.query.year);
                }

                courseCtrl.course_getAll(req,where,'name year course_logo')
                    .then(courses => {
                        res.json(courses);
                    })
                    .catch(err => {
                        res.status(err[0]).json(err[1]);
                    })
            }
            else
                res.status(values.unprocessableEntity).json(jsonStatus.wrong_params);
        }
        else if(req.query.course_id){
            courseCtrl.course_getById(req)
                .then(course => res.json(course))
                .catch(err => res.status(err[0].json(err[1])));

        }
        else
            res.status(values.unprocessableEntity).json(jsonStatus.wrong_params);

    }
    else
        res.status(values.not_authorized).json(jsonStatus.not_authorized);
});


router.delete('/course',function(req,res){
    if(req.user){
        if(req.user.role !== 'admin'){
            if(req.query.id){
                let where = {};
                where.user_id = req.user._id;
                where._id = req.query.id;
                courseCtrl.course_delete(req,where)
                    .then(status=>res.json(status))
                    .catch(err=>res.status(err[0]).json(err[1]));
            }
            else
                res.status(values.unprocessableEntity).json(jsonStatus.wrong_params);
        }
        else
            res.status(values.not_authorized).json(jsonStatus.inappropriate_role);
    }
    else
        res.status(values.not_authorized).json(jsonStatus.not_authorized);
});

router.put('/course',function(req,res){
    if(req.user){
        if(req.user.role === 'teacher'){
            courseCtrl.course_update_teacher(req)
                .then(status => res.json(status))
                .catch(err => res.status(err[0]).json(err[1]));
        }
        else
            res.status(values.not_authorized).json(jsonStatus.inappropriate_role);
    }
    else
        res.status(values.not_authorized).json(jsonStatus.not_authorized);

});

router.get('/course/generate',function(req,res){
    if(req.user){
        if(req.user.role === 'user'){
            courseCtrl.course_getById(req)
                .then(course => {
                    userCtrl.user_getById(course.user_id)
                        .then(user => {
                            userCtrl.user_getById(course.creator_id)
                                .then(creator => {
                                    if(user.group_name && user.study_year) {
                                        if(req.query.lab_id) {
                                            var lab = course.labs.id(req.query.lab_id);
                                            res.contentType('application/msword');
                                            generator(res, lab, course, user, creator);
                                        }
                                        else
                                            res.status(values.unprocessableEntity).json(jsonStatus.wrong_params);
                                    }
                                    else
                                        res.status(values.unprocessableEntity).json(jsonStatus.wrong_info);
                                })
                                .catch(err => res.status(err[0]).json(err[1]))

                        })
                        .catch(err => res.status(err[0]).json(err[1]));

                })
                .catch(err => res.status(err[0]).json(err[1]));
        }
        else
            res.status(values.not_authorized).json(jsonStatus.inappropriate_role);

    }
    else
        res.status(values.not_authorized).json(jsonStatus.not_authorized);
});

router.post('/course/lab',function(req,res){
    if(req.user){
        if(req.user.role === 'teacher'){
            courseCtrl.course_addLab(req)
                .then(status => res.json(status))
                .catch(err => res.status(err[0]).json(err[1]));
        }
        else
            res.status(values.not_authorized).json(jsonStatus.inappropriate_role);

    }
    else
        res.status(values.not_authorized).json(jsonStatus.not_authorized);
});
module.exports = router;