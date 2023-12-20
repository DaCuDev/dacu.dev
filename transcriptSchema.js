const { Schema, model } = require('mongoose')

const transcriptSchema = new Schema({
    ID: String,
    File: String
})

module.exports = model('transcriptSchema', transcriptSchema)