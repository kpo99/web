
var passport = require('passport');
    LocalStrategy = require('passport-local');
    User = require('../../models/user.server.model');
    hash = require('../hash');

module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        function(username,password,done) {
           User.findOne({username:username},'-__v',function (err,user) {
               if (err)
                   done(null,false);
               if(user) {
                   if (hash.sha512(password).passwordHash === user.password)
                       done(null, user);
                   else
                       done(null, false);
               }
               else
                   done(null, false);
           });


        }));
};
