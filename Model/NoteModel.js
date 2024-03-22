const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    Title: {
        type: String
    },
    Prioritize: {
        type: Number,
        default: 0,
    },
    DateCreate: {
        type: String,
        required : true
    },
    EmailCreate: {
        type: String,
        required: true
    },
    Content: {
        type: String
    },
})

module.exports = mongoose.model("Note", Schema, "Note");