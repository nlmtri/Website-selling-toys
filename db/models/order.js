var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    name: {
        type: String,
    },
    uid: {
        type: String,
    }
});

module.exports = mongoose.model('order', orderSchema, 'order');