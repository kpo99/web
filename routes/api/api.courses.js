/**
 * Created by Peter on 17.11.2016.
 */
"use strict";
var express = require('express');
var router = express.Router();
var courseCtrl = require('../../controllers/course.server.controller');
var jsonStatus = require('../../config/status');
var values = require('../../config/values');
var validator = require('../../config/validator');


router.get('/',function(req,res){
    if (req.user){
        if (req.query.size && req.query.offset){
            if (validator.isNumber(req.query.size) && validator.isNumber(req.query.offset)) {
                let where = {};
                const expression = 'name year course_logo';
                where.property = 'public';
                if(req.query.year){
                    if (validator.isNumber(req.query.year))
                        where.year = parseInt(req.query.year);
                }

                courseCtrl.course_getAll(req,where,expression)
                    .then(courses => {
                        res.json(courses);
                    })
                    .catch(err => {
                        res.status(err[0]).json(err[1]);
                    });
            }
            else
                res.status(values.unprocessableEntity).json(jsonStatus.wrong_params);

        }
        else
            res.status(values.unprocessableEntity).json(jsonStatus.wrong_params);

    }
    else
        res.status(values.not_authorized).json(jsonStatus.not_authorized);
});

module.exports = router;