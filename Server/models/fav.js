var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fav = new Schema({
    carID: String,
    userID: String,
    image: [String],
    brand: String,
    model: String,
    price: String
});
module.exports = mongoose.model('Fav', fav)
