const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

let username = "tungxm222"
let email = "tungxm222@gmail.com"
let password = "123123"
let fullname = "Hwang Tung"

function Register() {
    axios.post('http://localhost:4444/api/auth/register', { username, email, password, fullname })
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

function Login() {
    axios.post('http://localhost:4444/api/auth/login', { username, password }, {headers: {  }})
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
}


function Update() {
    axios.put('http://localhost:4444/api/user/6234e5d9c68442815283495e', {  }).then(response => console.log(response.data))
    .catch(err => console.log(err))
}
function Delete(userID) {

    axios.delete(`http://localhost:4444/api/user/${userID}`, {
        headers: {
          isAdmin: true
        },
        data: {
          uid: userID
        }
      }).then(response => console.log(response.data))
      .catch(err => console.log(err))
}

function FollowTo(user) {
    axios.put(`http://localhost:4444/api/user/${user}/follow`, { uid: "62357950a408828d2c67c30b" }).then(response => console.log(response.data))
    .catch(err => console.log(err))
}

function UnFollowTo(user) {
    axios.put(`http://localhost:4444/api/user/${user}/unfollow`, { uid: "62357950a408828d2c67c30b" }).then(response => console.log(response.data))
    .catch(err => console.log(err))
}

function CreatePost(uid, content) {
    axios.post(`http://localhost:4444/api/poster`, { 
        uid: uid, 
        content: content,
        image: "http://localhost:4444/public/images/img03.jpg"
    }).then(response => console.log(response.data))
    .catch(err => console.log(err))
}

function UpdatePost(poster) {
    axios.put(`http://localhost:4444/api/poster/${poster}`, { 
        uid: "62357950a408828d2c67c30b",
        content: "Hello world, I am Tung Hwang!!!",
        image: "http://localhost:4444/public/images/img02.jpg"
    }).then(response => console.log(response.data))
    .catch(err => console.log(err))
}

function Like(poster) {
    axios.put(`http://localhost:4444/api/poster/like/${poster}`, { 
        uid: "62357950a408828d2c67c30b"
    }).then(response => console.log(response.data))
    .catch(err => console.log(err))
}

function Comment(poster, content) {
    axios.post(`http://localhost:4444/api/poster/comment/${poster}`, { 
        uid: "62357950a408828d2c67c30b",
        content: content
    }).then(response => console.log(response.data))
    .catch(err => console.log(err))
}

function GetPosters(uid) {
    axios.get(`http://localhost:4444/api/poster/${uid}`)
    .then(response => console.log(response.data))
    .catch(err => console.log(err))
}

function GetNewsFeed(uid) {
    axios.get(`http://localhost:4444/api/poster/newsfeed/${uid}`)
    .then(response => console.log(response.data))
    .catch(err => console.log(err))
}
// Register()
Login()
// Update()

// Delete("6234e5d9c68442815283495e")
// FollowTo("6235796fa3cbe74c78e3e908")
// UnFollowTo("6235796fa3cbe74c78e3e908")

// CreatePost("62361f846c012da875f8ed40", "Fucking job, gru gru")
// UpdatePost("62359c107706e35a79103bbe")
// Like("62359c107706e35a79103bbe")
// Comment("62359c107706e35a79103bbe", "Bai hay qua, cam on nha")
// Comment("62359c107706e35a79103bbe", "Bai hay qua, cam on nha")
// Comment("62359c107706e35a79103bbe", "Bai hay qua, cam on nha")
// Comment("62359c107706e35a79103bbe", "Bai hay qua, cam on nha")
// GetPosters("62357950a408828d2c67c30b")
// GetNewsFeed("62357950a408828d2c67c30b")