const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const Schema = mongoose.Schema

const ImageSchema = new Schema({
    path: { type: String },
    source: Buffer,
}, { timestamps: true, collection: 'images' })

var Image = mongoose.model('images', ImageSchema)
module.exports = { Image }

