/**
 * Created by Peter on 18.11.2016.
 */
var mongoose = require('mongoose');
Schema = mongoose.Schema;

var test = new Schema({
    str: String
});

module.exports = mongoose.model('Test',test);