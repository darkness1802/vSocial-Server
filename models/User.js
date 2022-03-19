const mongoose = require('mongoose')

const Schema = mongoose.Schema
const UserSchema = new Schema({
    username: {
        type: String, 
        required: true,
        min: 4,
        max: 22,
        unique: true
    }, email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    }, password: {
        type: String,
        required: true,
        min: 6
    }, fullname: {
        type: String,
        required: true
    }, profilePicture: {
        type: String,
        default: ""
    }, coverPicture: {
        type: String,
        default: ""
    }, followers: {
        type: Array,
        default: []
    }, isAdmin: {
        type: Boolean,
        default: false
    }, desc: {
        type: String,
        max: 55
    }, country: {
        type: String,
    }, city: {
        type: String,
    }
}, { timestamps: true, collection: 'users' })

module.exports = mongoose.model("User", UserSchema)