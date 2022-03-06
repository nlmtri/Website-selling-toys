var mongoose = require('mongoose');

var orderdetailSchema = mongoose.Schema({
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
    },
    id_order: {
        type: String
    }
});

module.exports = mongoose.model('orderdetail', orderdetailSchema, 'orderdetail');