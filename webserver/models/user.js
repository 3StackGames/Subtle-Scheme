var mongoose = require('mongoose')
var Schema = mongoose.Schema

module.exports = mongoose.model('User', new Schema({
    username: String,
    password: String,
    active: Boolean,
    packs: [Schema.Types.ObjectId],
    questionsUsed: [Schema.Types.ObjectId]
}))