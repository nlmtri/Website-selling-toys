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
    phone: {
        type: String,
    },
    total: {
        type: Number,
        default: 0
    },
    uid: {
        type: String,
    }
});

module.exports = mongoose.model('order', orderSchema, 'order');