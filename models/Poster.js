const mongoose = require('mongoose')

const Schema = mongoose.Schema
const PosterSchema = new Schema({
    content: { type: String },
    userID: { type: String },
    like: { type: Number, default: 0 },
    liker: { type: Array, default: [] },
    comment: { type: Number, default: 0 },
    commentContent: { type: Array, default: [] }
}, { timestamps: true, collection: 'posters' })

module.exports = mongoose.model("Poster", PosterSchema)