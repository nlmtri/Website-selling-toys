var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'No Name'
    },
    type: {
        type: String,
        default: 'No Type'
    },
    price: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: 'noimg.jpg'
    }
});

module.exports = mongoose.model('cart', cartSchema, 'cart');