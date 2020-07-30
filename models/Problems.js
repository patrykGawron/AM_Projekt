const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');


const ProblemSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
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

ProblemSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Problem', ProblemSchema)