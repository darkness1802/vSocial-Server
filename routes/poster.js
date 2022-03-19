const router = require('express').Router()
const Poster = require('../models/Poster')

router.post("/", async (req, res) => {
    // Create a new Poster
    console.log(`Create: ${req.body.content}`);
    try {
        Poster.create({
            content: req.body.content,
            userID: req.body.uid
        })
        res.status(200).json({ msg: 'Success' })
    } catch (err) {
        console.log(err);
    }
})

module.exports = router