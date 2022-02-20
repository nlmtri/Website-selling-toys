let mongoose = require('mongoose');

const mongodb_url = 'mongodb+srv://atnshop:GBHImoioHqBAgUYa@cluster0.qqlek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(mongodb_url, {useNewUrlParser: true})
            .then(() => {
                console.log("Database connection successfully!");
            })
            .catch(err => {
                console.log("Database connection error!");
            })
    }
}

module.exports = new Database();