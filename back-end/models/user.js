const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    firstName: {type: String, required: true},
    surName: {type: String, required: true},
    dob: {type: Date, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    password: {type: String, required: true},
}, {timestamps: true});

module.exports = mongoose.model('User', userModel);