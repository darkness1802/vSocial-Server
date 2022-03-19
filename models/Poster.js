const mongoose = require('mongoose')

const Schema = mongoose.Schema
const PosterSchema = new Schema({
    content: { type: String },
    image: { type: String },
    userID: { type: String, required: true },
    liker: { type: Array, default: [] },
    comment: { type: Number, default: 0 },
    commentContent: { type: Array, default: [] }
}, { timestamps: true, collection: 'posters' })

const CommentSchema = new Schema({
    poster: { type: String, required: true },
    content: { type: String },
    userID: { type: String, required: true },
}, { timestamps: true, collection: 'comments' })

const Poster = mongoose.model("Poster", PosterSchema)
const Comment = mongoose.model("Comment", CommentSchema)
module.exports = { Poster, Comment }