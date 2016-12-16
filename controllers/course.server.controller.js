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
                       description: req.body.description,
                       course_logo: req.body.course_logo,
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
                        resolve(course);
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
                return new Promise(function (res,rej) {
                    Course.findOne({global_id: req.body.id,property: 'private',user_id: req.user._id}, function(err,course){
                        if(err)
                            rej([values.internalServerError,err]);
                        if(course)
                            rej([values.forbidden,jsonStatus.subscribe_error]);
                        else
                            res();
                    });
                })
                    .then(() => {
                        Course.findOne({_id: req.body.id, property: 'public'},function(err,course){
                            if (err)
                                reject([values.internalServerError,err]);
                            if(course) {
                                course.global_id = course._id;
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
                    })
                    .catch(err => reject(err));


            }
            else
                reject([values.not_authorized,jsonStatus.inappropriate_role]);

        }
        else
            reject([values.not_authorized,jsonStatus.not_authorized]);

    });
};


exports.course_update_teacher = function (req) {
    return new Promise(function (resolve,reject) {
        if(req.user){
            if(req.user.role === 'teacher'){
                if(!req.body._id)
                    reject([values.unprocessableEntity,jsonStatus.wrong_body]);
                let where = {};
                where.user_id = req.user._id;
                where._id = req.body._id;

                Course.findOne(where,function(err,course){
                    if (err)
                        reject([values.internalServerError,err]);
                    if(course){
                        if(req.body.name)
                            course.name = req.body.name;
                        if(req.body.year) {
                            if (validator.isNumber(req.body.year))
                                course.year = parseInt(req.body.year);
                            else
                                reject([values.unprocessableEntity,jsonStatus.wrong_params]);

                        }

                        if (req.body.description)
                            course.description = req.body.description;
                        if (req.body.course_logo)
                            course.course_logo = req.body.course_logo;
                        course.save(function (err, course) {
                           if(err)
                               reject([values.internalServerError,err]);
                            else
                               resolve(course);
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
            where.property = 'private';
            where._id = req.query.course_id;
            Course.findOne(where,function(err,course){
                if (err)
                    reject([values.internalServerError,err]);
                if (course)
                    resolve(course);
                else
                {
                    Course.findOne({_id: req.query.course_id, property: 'public'}, function(error,gCourse){
                        if (error)
                            reject([values.internalServerError,error]);
                        if (gCourse)
                            resolve(gCourse);
                        else
                            reject([values.notFound,jsonStatus.not_found]);
                });
                }

            });


        }
        else
            reject([values.not_authorized,jsonStatus.not_authorized]);
    });

};

exports.course_addLab = function (req) {
    return new Promise(function (resolve,reject) {
       if(req.user){
            if( req.user.role === 'teacher'){

                if(!req.body.id)
                    reject([values.unprocessableEntity,jsonStatus.wrong_body]);
                let where = {};
                where.user_id = req.user._id;
                where._id = req.body.id;
                Course.findOne(where,function(err,course){
                    if (err)
                        reject([values.internalServerError,err]);
                    if (course)
                    {
                     var lab = new Lab({
                         number: parseInt(req.body.number),
                         task_description: req.body.task_description,
                         aim: req.body.aim,
                         theme: req.body.theme
                     });
                        course.labs.push(lab);
                        course.save(function (err) {
                            if(err)
                                reject([values.internalServerError,err]);
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



exports.course_subscribeLab = function (req) {
  return new Promise(function (resolve,reject) {
      if (req.user){
          if (req.user.role === 'user'){
            if(!req.body.course_id || !req.body.lab_id)
                reject([values.unprocessableEntity,jsonStatus.wrong_body]);


            new Promise(function(res,rej) {
                Course.findOne({_id: req.body.course_id, property: 'public'}, function (err, course) {
                    if (err)
                        rej([values.internalServerError, err]);
                    if (course) {
                        res(course);
                    }
                    else
                        rej([values.notFound, jsonStatus.not_found]);
                });
            })  .then(course => {
                    Course.findOne({user_id: req.user._id ,global_id: req.body.course_id, property: 'private'},function(err,pCourse){
                        if(err)
                            reject([values.internalServerError, err]);
                        if(pCourse){
                            var lab = course.labs.id(req.body.lab_id);
                            if(!lab)
                                reject([values.notFound, jsonStatus.not_found]);
                            if(req.body.variant)
                                lab.variant = parseInt(req.body.variant);
                            if (pCourse.labs.id(req.body.lab_id))
                                reject([values.forbidden,jsonStatus.subscribe_error]);
                            pCourse.labs.push(lab);
                            pCourse.save(function(err){
                                if(err)
                                    reject([values.internalServerError, err]);
                                else
                                    resolve(jsonStatus.save_succes);
                            });

                        }
                        else
                            reject([values.notFound, jsonStatus.course_not_exist]);
                    });
            })
                .catch(error => reject(error));

          }
          else
              reject([values.not_authorized,jsonStatus.inappropriate_role]);
      }
      else
          reject([values.not_authorized,jsonStatus.not_authorized]);

  });
};



exports.lab_get = function(req)
{
    return new Promise(function (resolve,reject) {
        if (req.user){
            if (req.user.role !== 'admin'){
                if(!req.query.course_id || !req.query.lab_id)
                    reject([values.unprocessableEntity,jsonStatus.wrong_body]);

                    Course.findOne({_id: req.query.course_id}, function (err, course) {
                        if (err)
                            reject([values.internalServerError, err]);
                        if (course) {
                            var lab = course.labs.id(req.query.lab_id);
                            if(!lab)
                                reject([values.notFound, jsonStatus.not_found]);
                            else
                                {
                                    lab.user_id = course.user_id;
                                    resolve(lab);
                                }


                        }
                        else
                            reject([values.notFound, jsonStatus.not_found]);
                    });

            }
            else
                reject([values.not_authorized,jsonStatus.inappropriate_role]);
        }
        else
            reject([values.not_authorized,jsonStatus.not_authorized]);

    });
};




exports.lab_update= function(req)
{
    return new Promise(function (resolve,reject) {
        if (req.user){
            if (req.user.role !== 'admin'){
                if(!req.body.course_id || !req.body.lab_id)
                    reject([values.unprocessableEntity,jsonStatus.wrong_body]);

                Course.findOne({_id: req.body.course_id, user_id : req.user._id}, function (err, course) {
                    if (err)
                        reject([values.internalServerError, err]);
                    if (course) {
                        var lab = course.labs.id(req.body.lab_id);
                        if(!lab)
                            reject([values.notFound, jsonStatus.not_found]);
                        else
                        {
                            course.labs.pull({_id: req.body.lab_id});
                            lab.code_examples = req.body.code_examples;
                            lab.summary = req.body.summary;
                            course.labs.push(lab);
                            course.save(function (err,res) {
                               if (err)
                                   reject([values.internalServerError, err]);
                               if (res)
                                   resolve(res);

                            });

                        }

                    }
                    else
                        reject([values.notFound, jsonStatus.not_found]);
                });

            }
            else
                reject([values.not_authorized,jsonStatus.inappropriate_role]);
        }
        else
            reject([values.not_authorized,jsonStatus.not_authorized]);

    });
};
