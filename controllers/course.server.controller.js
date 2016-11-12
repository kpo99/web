"use strict";
var mongoose = require('mongoose');
var jsonStatus = require('../config/status');
var Course = require('../models/course.server.model');
var values = require('../config/values');
var validator = require('../config/validator');
var Lab = mongoose.model('Lab',require('../models/schemas/LabSchema'));

exports.course_create = function(req){

    return new Promise(function (resolve, reject) {
       if (req.user) {
           if (req.user.role === 'teacher') {

                   var courseEntry = new Course({
                       user_id: req.user._id,
                       creator_id: req.user._id,
                       name: req.body.name,
                       year: parseInt(req.body.year),
                       property: 'public',

                   });

                   courseEntry.save(function(err,course){
                       if (err)
                           reject([values.internalServerError,err]);
                       else
                           resolve(jsonStatus.save_succes);
                   });


           }
           else
               reject([values.not_authorized,jsonStatus.inappropriate_role]);
       }
       else
           reject([values.not_authorized,jsonStatus.not_authorized]);

    });
};


exports.course_delete = function(req,where){
    return new Promise(function(resolve,reject){
        if(req.user){
            if(req.user.role !== 'admin'){
                Course.findOneAndRemove(where,function(err,course){
                    if (err)
                        reject([values.internalServerError, err]);
                    if(course)
                        resolve(jsonStatus.delete_succes);
                    else
                        reject([values.badRequest,jsonStatus.not_deleted]);
                });

            }
            else
                reject([values.not_authorized,jsonStatus.inappropriate_role]);
        }
        else
            reject([values.not_authorized,jsonStatus.not_authorized]);

    });
};

exports.course_getAll = function(req,where,findExpression){
    return new Promise(function (resolve,reject) {
        if(req.user) {
            Course.find(where, findExpression).skip(parseInt(req.query.offset)).limit(parseInt(req.query.size))
                .exec(function (err, courses) {
                    if (err)
                        reject([values.internalServerError, err]);
                    if (courses)
                        resolve(courses);

                });
        }
        else
            reject([values.not_authorized,jsonStatus.not_authorized]);
    });
};

exports.course_subscribe = function(req){
    return new Promise(function(resolve,reject){
        if (req.user){
            if (req.user.role === 'user'){
                if(!req.body.id)
                    reject([values.unprocessableEntity,jsonStatus.wrong_body]);
                Course.findOne({_id: req.body.id, property: 'public'},function(err,course){
                    if (err)
                        reject([values.internalServerError,err]);
                    if(course) {
                        course._id = mongoose.Types.ObjectId();
                        course.isNew = true;
                        course.user_id = req.user._id;
                        course.property = 'private';
                        course.save(function (error, newCourse) {
                            if (error)
                                reject([values.internalServerError, error]);
                            resolve(jsonStatus.save_succes);

                        });
                    }
                    else
                        reject([values.notFound,jsonStatus.not_found]);

                });
            }
            else
                reject([values.not_authorized,jsonStatus.inappropriate_role]);

        }
        else
            reject([values.not_authorized,jsonStatus.not_authorized]);

    });
};






exports.course_getById = function(req){
    return new Promise(function(resolve,reject){
        if(req.user){
            if(!req.query.course_id)
                reject([values.unprocessableEntity,jsonStatus.wrong_body]);
            let where = {};
            where.user_id = req.user._id;
            where._id = req.query.course_id;
            Course.findOne(where,function(err,course){
                if (err)
                    reject([values.internalServerError,err]);
                if (course)
                    resolve(course);
                else
                    reject([values.notFound,jsonStatus.not_found]);

            });


        }
        else
            reject([values.not_authorized,jsonStatus.not_authorized]);
    });

};



