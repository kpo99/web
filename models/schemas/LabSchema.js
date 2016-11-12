/**
 * Created by Peter on 11.11.2016.
 */
var mongoose = require('mongoose');
Schema = mongoose.Schema;

var minLength = [10,'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];
var maxLength = [20,'The value of path `{PATH}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).'];



var LabSchema = new Schema({
    number: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required:true,
        minlength: minLength
    },
    theme: {
        type: String,
        required:true,
        minlength: minLength
    },
    aim: {
        type: String,
        required:true,
        minlength: minLength
    },
    variant: {
        type: Number,
        required: true,
        default: 1
    }
});

module.exports = LabSchema;