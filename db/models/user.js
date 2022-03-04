var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
        default: 'No Name'
    },
    address: {
        type: String,
        default: 'No address'
    },
    role: {
        type: String,
        default: 'No Type'
    },
});

module.exports = mongoose.model('user', userSchema, 'user');