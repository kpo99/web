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


exports.user_getById = function(user_id){
    return new Promise(function (resolve,reject) {
        User.findOne({_id: user_id},function(err,user){
            if(err)
                reject(reject([values.internalServerError,err]));
            if(user)
                resolve(user);
            else
                reject([values.notFound,jsonStatus.not_found]);
        });
    });
};
