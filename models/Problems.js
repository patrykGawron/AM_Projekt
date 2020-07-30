const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true
    },
    explanation: {
        type: String,
        required: false
    },
    solution: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Problem', UserSchema)