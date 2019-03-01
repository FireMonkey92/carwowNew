var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var car = new Schema({
    image: [String],
    brand: String,
    model: String,
    price: String,
    keySpecs: {
        mileage: String,
        engine: String,
        bhp: String,
        transmission: String,
        seats: String,
        airbags: String,
        fueltype: String,
        bootspace: String
    }
});
module.exports = mongoose.model('Car', car)