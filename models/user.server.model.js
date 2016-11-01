/**
 * Created by Peter on 10.11.2016.
 */
var mongoose = require('mongoose');
    Schema = mongoose.Schema;


var minLength = [3,'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];
var defLength = [10,'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];
var maxLength = [20,'The value of path `{PATH}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).'];

var validateEmail = function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};




var UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: minLength,
        maxlength: maxLength
    },
    surname:{
        type: String,
        required: true,
        minlength: minLength,
        maxlength: maxLength
    },
    patronymic: {
        type: String,
        required: true,
        minlength: minLength,
        maxlength: maxLength
    },
    username: {
        type: String,
        required: true,
        minlength: minLength,
        maxlength: maxLength
    },
    password:
    {
        type: String,
        required: true,
        minlength: minLength
    },
    role: {
        type: String,
        required: true,
        enum: ['user','teacher','admin'],
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        validate: [validateEmail,'Wrong email address']
    },
    avatar: {
        type: String,
        required: false
    },
    study_year: {
        type: Number
                     // TODO validation
    },
    group_name: {
        type: String  // TODO validation
    }

});

module.exports = mongoose.model('User',UserSchema);