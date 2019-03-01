var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var brand = new Schema({
    image: String,
    brand: String,
});
module.exports = mongoose.model('Brand', brand)