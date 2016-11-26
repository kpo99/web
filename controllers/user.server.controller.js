"use strict";

var User = require('../models/user.server.model');
var hash = require('../config/hash');
var jsonStatus = require('../config/status');
var values = require('../config/values');
let error = {
    status: 'error'
};

exports.create = function(req,res){



    return new Promise(function(resolve,reject) {

        User.findOne({username:req.body.username}, function(err,user){
            if(err)
                reject(reject([values.internalServerError,err]));
            if (user)
                reject(reject([400,jsonStatus.wrong_username]));

        });

        var userEntry = new User({
            name: req.body.name,
            surname: req.body.surname,
            patronymic: req.body.patronymic,
            username: req.body.username,
            password: hash.sha512(req.body.password).passwordHash,
            email: req.body.email

        });

        userEntry.save(function (err) {
            if (err)
                reject(reject([values.internalServerError,err]));
             resolve(jsonStatus.save_succes);
        });
    });
};


var user_getById = function(user_id){
    return new Promise(function (resolve,reject) {
        User.findOne({_id: user_id},function(err,user){
            if(err)
                reject([values.internalServerError,err]);
            if(user)
                resolve(user);
            else
                reject([values.notFound,jsonStatus.not_found]);
        });
    });
};

exports.user_getById = user_getById;


exports.user_update = function(req){
    return new Promise(function(resolve,reject){
        if (req.user){
            user_getById(req.user._id)
                .then(user => {
                    if (req.query.name)
                        user.name = req.query.name;
                    if(req.query.surname)
                        user.surname = req.query.surname;
                    if (req.query.patronymic)
                        user.patronymic = req.query.patronymic;
                    if (req.query.email)
                        user.email = req.query.email;
                    if (req.query.group_name)
                        user.group_name = req.query.group_name;
                    if (req.query.study_year)
                        user.study_year = parseInt(req.query.study_year);
                    user.save(function (err) {
                       if (err)
                           reject([values.internalServerError,err]);
                        resolve(jsonStatus.save_succes);
                    });
                })
                .catch(err => reject(err));

        }
        else
            reject([values.not_authorized,jsonStatus.not_authorized]);
    });
};

exports.user_changePassword = function(req){
    return new Promise(function (resolve,reject) {
       if (req.user)
       {
            if (req.query.old_password && req.query.new_password && req.query.confirm_password){
                if (req.query.new_password !== req.query.confirm_password)
                    reject([402,jsonStatus.pass_no_match]);
                user_getById(req.user._id)
                    .then(user => {
                        if (user.password === hash.sha512(req.query.old_password).passwordHash){
                            user.password = hash.sha512(req.query.new_password).passwordHash;
                            user.save(function (err) {
                               if(err)
                                   reject([values.internalServerError,err]);
                                resolve(jsonStatus.save_succes);
                            });
                        }
                        else
                            reject([403,jsonStatus.pass_no_match]);
                    })
                    .catch();
            }
            else
                reject([values.unprocessableEntity,jsonStatus.wrong_body]);
       }
       else
           reject([values.not_authorized,jsonStatus.not_authorized]);
    });
};
