const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const user_router = require('./routes/user')
const auth_router = require('./routes/auth')
const poster_router = require('./routes/poster')

dotenv.config()
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// <<<--- middle ware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(helmet())
// app.use(morgan("common"))
// --->>> middle ware

app.get("/", (req, res) => {
    res.json({ msg: "users" })
})

// <<<--- routes
app.use("/api/user", user_router)
app.use("/api/auth", auth_router)
app.use("/api/poster", poster_router)
// --->>> routes

app.listen(4444, () => {
    console.log(`Server is running on port 4444`);
})