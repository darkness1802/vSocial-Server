const router = require('express').Router()
const User = require('../models/User')
const { Poster, Comment } = require('../models/Poster')

/* Create */ router.post("/", async (req, res) => {
    console.log(`Create: ${req.body.content}`);
    try {
        Poster.create({
            content: req.body.content,
            image: req.body.image,
            userID: req.body.uid
        })
        res.status(200).json({ msg: 'Success' })
    } catch (err) {
        console.log(err);
    }
})

/* Update */ router.put("/:id", async (req, res) => {
    try {
        let post = await Poster.findByIdAndUpdate(req.params.id)
        
        if (req.body.uid === post.userID) {
            await post.updateOne({$set: req.body})
            res.status(200).json({ msg: "Success: UPDATE"})
        } else {
            res.status(403).json({ msg: 'Không có quyền sửa bài viết này' })
        }
    } catch (err) {
        res.status(500).json({ msg: err})
    }
})

/* Delete */ router.delete("/:id", async (req, res) => {
    try {
        let post = await Poster.findByIdAndUpdate(req.params.id)
        // Delete xảy ra khi id người gửi request = post.userID
        if (req.body.uid === post.userID) {
            await post.updateOne({$set: req.body})
            res.status(200).json({ msg: "Success: DETELE"})
        } else {
            res.status(403).json({ msg: 'Không có quyền sửa bài viết này' })
        }
    } catch (err) {
        res.status(500).json({ msg: err})
    }
})

/* Like */ router.put("/like/:postid", async (req, res) => {
    try {
        let post = await Poster.findById(req.params.postid)
        // Nếu req.body.uid (đối tượng like bài viết) đã tồn tại trong post.liker => dislike
        if (post.liker.includes(req.body.uid)) {
            await Poster.findByIdAndUpdate(req.params.postid, {$pull: { liker: req.body.uid }})
            res.status(200).json({ msg: "Dislike", user: req.body.uid, post: req.params.postid })
        } else {
            await Poster.findByIdAndUpdate(req.params.postid, {$push: { liker: req.body.uid }})
            res.status(200).json({ msg: "Like", user: req.body.uid, post: req.params.postid })
        }
    } catch (err) {
        res.status(500).json({ msg: err})
    }
})

// <<<--- Comment

/* Create */ router.post("/comment/:postid", async (req, res) => {
    try {
        await Comment.create({
            poster: req.params.postid,
            content: req.body.content,
            userID: req.body.uid
        })
        res.status(200).json({ msg: 'Comment created successfully' })
    } catch (err) {
        res.status(500).json(err)
    }
})

/* Update */

/* Delete */

// Comment --->>>

// GET tất cả bài viết của bạn bè

router.get('/newsfeed/:uid', async function (req, res) {
    console.log(`GET: Các bài viết của những người mà ${req.params.uid} theo dõi`)
    try {
        let user = await User.findById(req.params.uid)
        let user_post = await Poster.find({ userID: user._id })
        let followers_post = await Promise.all(user.followers
        .map(id => {
            console.log(`RUN: Poster.find({ userID: ${id} })`);
            return Poster.find({ userID: id })
        }))
        let result = user_post.concat(...followers_post)
        res.status(200).json(result)
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Error" })
    }
})

router.get("/:uid", (req, res) => {
    console.log(`GET ALL POSTERS FROM USER: ${req.params.uid}`);
    Poster.find({ userID: req.params.uid }).then(result => {
        res.status(200).json(result)
    }).catch(err => { res.status(500).json({ msg: "Error: " + err.message })})
})

module.exports = router