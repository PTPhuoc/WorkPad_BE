const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Type: {
        type: String,
        default: "Normal"
    }
})

module.exports = mongoose.model('Account', AccountSchema, 'Account');