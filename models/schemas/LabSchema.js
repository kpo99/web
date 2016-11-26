/**
 * Created by Peter on 11.11.2016.
 */
var mongoose = require('mongoose');
Schema = mongoose.Schema;

var minLength = [10,'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];
var descriptionMinLength = [250,'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];
var descriptionMaxLength = [1000,'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];
var maxLengthT = [50,'The value of path `{PATH}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).'];
var maxLengthA = [200,'The value of path `{PATH}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).'];




var LabSchema = new Schema({
    number: {
        type: Number,
        required: true,
    },
    theme: {
        type: String,
        required:true,
        minlength: minLength,
        maxLength: maxLengthT
    },
    aim: {
        type: String,
        required:true,
        minlength: minLength,
        maxLength: maxLengthA
    },
    task_description: {
        type: String,
        required:true,
        minlength: minLength,
        minlength: descriptionMinLength,
        maxLength: descriptionMaxLength

    },
    variant: {
        type: Number,
        required: true,
        default: 1
    }
});

module.exports = LabSchema;