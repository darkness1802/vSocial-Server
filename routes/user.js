const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

router.get("/", (req, res) => {
    res.json({ msg: "Hello" })
})

/* update user */ router.put("/:uid", async (req, res) => {
    console.log("UPDATE:", req.body.uid, req.params.uid)
    if(req.body.uid === req.params.uid) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (e) {
                return res.status(500).json(e)
            }
        }
        try {
            let user = await User.findByIdAndUpdate(req.params.uid, {
                $set: req.body
            })
            res.status(200).json({ msg: "Đã update"})
        } catch (e) {
            console.log(e)
        }
    } else {
        return res.status(403).json({ msg:"Can not update another user" })
    }
})

/* delete user */ router.delete("/:uid", async (req, res) => {
    console.log("DELETE:", req.body.uid, req.params.uid)
    console.log(req.headers);
    if(req.body.uid === req.params.uid || req.headers.isAdmin===true) {
        
        try {
            let u = await User.findByIdAndDelete(req.body.uid)
            console.log(u);
            res.status(200).json({ msg: "Complete" })
        } catch (e) {
            console.log(e)
            return res.status(500).json(e)
        }
        
    } else {
        return res.status(403).json({ msg:"Can not update another user" })
    }
})

/* follow a user */ router.put("/:to/follow", async (req, res) => {
    console.log(`USER: ${req.body.uid} FOLLOW TO USER: ${req.params.to}`);
    if (req.body.uid !== req.params.to) {
        try {
            const user = await User.findById(req.body.uid)
            if (user.followers.includes(req.params.to)) {
                // Khi người dùng đã follow người này rồi
                res.status(403).json({ msg: "Bạn đã follow người này trước đây" })
            } else {
                // Khi người dùng chưa follow người này
                await User.findByIdAndUpdate(req.body.uid, {$push: {
                    followers: req.params.to
                }})
                res.status(200).json({ msg: "Success"})
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    } else {
        res.status(403).json({ msg: "Khong the theo doi chinh ban than" })
    }
})

/* un follow */ router.put("/:to/unfollow", async (req, res) => {
    console.log(`USER: ${req.body.uid} UN FOLLOW USER: ${req.params.to}`);
    if (req.body.uid !== req.params.to) {
        try {
            const user = await User.findById(req.body.uid)
            if (user.followers.includes(req.params.to)) {
                // Khi người dùng đã follow người này rồi: thực hiện xóa
                await User.findByIdAndUpdate(req.body.uid, {$pull: {
                    followers: req.params.to
                }})
                res.status(200).json({ msg: "Đã hủy theo dõi thằng lol này" })
            } else {
                // Khi người dùng chưa follow người này
                res.status(500).json({ msg: "Error 89" })
            }
        } catch(err) {
            res.status(403).json({ msg: "Error 91" })
        }
    } else {
        res.status(403).json({ msg: "Error 94" })
    }
})

module.exports = router