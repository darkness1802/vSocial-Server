const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require("jsonwebtoken")

// register
router.post("/register", async (req, res) => {
    try {
        let salt = await bcrypt.genSalt(10)
        let hashedPasswords = await bcrypt.hash(req.body.password, salt)
        let result = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPasswords,
            fullname: req.body.fullname,
        })
        console.log("Result:", result)
        res.json({ msg: result })
    } catch (err) {
        res.json({ error: "Email hoặc username đã tồn tại" })
    }
})

router.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username })
        if (!user) return res.status(404).json({ error: "User not found" })
        let validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid password" })
        } else {
            let accessToken = generateAccessToken(req.body.username)
            return res.status(200).json({token: accessToken, user: user._id})
        }
    } catch (err) {
        console.log(err);
    }
})

function generateAccessToken(user) {
    return jwt
    .sign(
        { username: user }, 
        process.env.SECRET_KEY,
        { expiresIn: '30m' }
    )
}

router.post("/verify", (req, res) => {
    const token = req.headers.token
    console.log(token)
    if (!token) {
        console.log(`Token is undefined`)
        return res.status(401).json({ verified: false })
    } 
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) { 
            console.log(`Token is not verified`, err)
            return res.status(401).json({ verified: false })
        } else {
            console.log(`Token is verified`)
            return res.status(200).json({ verified: true })
        }
    })
})
function authenticateToken(req, res, next) {
    const token = req.headers.token
    if (!token) {
        return res.status(401).json("Error 53")
    } 
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) res.status(403).json("Error 56")
        req.user = user
        next()
    })
}

module.exports = router