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

// const UserSchema = new Schema({
//     username: String,
//     email: String,
//     password: String,
//     isAdmin: false
// }, { collection: 'users' })

var User = mongoose.model('users', UserSchema)

module.exports = { User, Product }

