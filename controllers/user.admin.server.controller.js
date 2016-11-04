/**
 * Created by Peter on 11.11.2016.
 */
"use strict";

var User = require('../models/user.server.model');
var hash = require('../config/hash');
var jsonStatus = require('../config/status');


let error = {
    status: 'error'
};

exports.admin_create = function(req,res) {
    return new Promise(function(resolve,reject) {

        User.findOne({username:req.body.username}, function(err,user){
            if(err) {
                error.messege = err;
                reject(error);
            }
            if (user) {
                error.messege = 'Username is already taken!';
                reject(error);
            }
        });

        var userEntry = new User({
            name: req.body.name,
            surname: req.body.surname,
            username: req.body.username,
            password: hash.sha512(req.body.password).passwordHash,
            email: req.body.email,
            role: req.body.role
        });

        userEntry.save(function (err) {
            if (err){
                error.messege = err;
                reject(error);
            }
            resolve(jsonStatus.save_succes);
        });
    });


};