var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    profilePic: String,
    email: String,
    username: String,
    password: String,
});
module.exports = mongoose.model('User', user)