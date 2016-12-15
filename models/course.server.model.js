var mongoose = require('mongoose');
    Schema = mongoose.Schema;
    LabSchema = require('./schemas/LabSchema');



var minLength = [10,'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];
var maxLength = [20,'The value of path `{PATH}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).'];
var maxDescriptionLength = [300,'The value of path `{PATH}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).'];
var mixDescriptionLength = [150,'The value of path `{PATH}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).'];


var validateYear = function(value){
  // todo
    if (value >= 2015) // hardcode here
        return true;
};

var CourseSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    creator_id: {
        type: String,
        required: true,
    },
    global_id: {
      type: String
    },
    name: {
        type: String,
        required:true,
        minlength: minLength
    },
    year: {
        type: Number,
        required: true,
        validate: [validateYear,'Wrong year value (`{VALUE}`)']
    },
    course_logo: {
        type: String,
    },
    description : {
        type: String,
        required : true,
        minlength: mixDescriptionLength,
        maxlength: maxDescriptionLength

    },
    property:
    {
        type: String,
        required: true,
        enum: ['public','private']
    },
    labs: [LabSchema]
});

module.exports = mongoose.model('Course',CourseSchema);