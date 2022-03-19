const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

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
        let user = User.findOne({ username: req.body.username })
        if (!user) res.status(404).json({ error: "User not found" })
        let validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            res.status(400).json({ error: "Invalid password" })
        } else {
            res.status(200).json(user)
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router