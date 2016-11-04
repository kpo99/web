/**
 * Created by Peter on 11.11.2016.
 */
var express = require('express');
var router = express.Router();
var adminUserCtrl = require('../controllers/user.admin.server.controller');

/* GET admin page. */
router.get('/create', function(req, res, next) {
    if (req.user) {
        if (req.user.role === "admin")
            res.render('adminCreate');
        else
            res.end('Your role is ' + req.user.role);  // todo
    }
    else
        res.end('Don\'t have rights');  // todo
});


/* POST admin listing. */
router.post('/create', function(req, res, next) {
    if (req.user) {
        if (req.user.role === "admin") {
            adminUserCtrl.admin_create(req, res)
                .then(result => res.json(result))
                .catch(err => res.json(err));
        }
        else
            res.end('Your role is ' + req.user.role);  // todo

    }
    else
        res.end('Don\'t have rights');  // todo
});

module.exports = router;
