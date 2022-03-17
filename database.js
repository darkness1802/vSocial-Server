const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true, collection: 'users' })

const ImageSchema = new Schema({
    path: { type: String },
    source: Buffer,

}, { timestamps: true, collection: 'images' })

var User = mongoose.model('users', UserSchema)
var Image = mongoose.model('images', ImageSchema)
module.exports = { User, Image }

