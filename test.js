const axios = require('axios')

let username = "tungxm321"
let email = "tungxm321@gmail.com"
let password = "123123"
let fullname = "Hwang Tung"

function Register() {
    axios.post('http://localhost:4444/api/auth/register', { username, email, password, fullname })
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

function Login() {
    axios.post('http://localhost:4444/api/auth/login', { username, password })
    .then(res => console.log(res))
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

function CreatePost() {
    axios.post(`http://localhost:4444/api/poster`, { 
        uid: "62357950a408828d2c67c30b", 
        content: "Hello world, say oh yeah yeah yeah!!!",
        image: "http://localhost:4444/public/images/img01.jpg"
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
// Register()
// Login()
// Update()

// Delete("6234e5d9c68442815283495e")
// FollowTo("6235796fa3cbe74c78e3e908")
// UnFollowTo("6235796fa3cbe74c78e3e908")

// CreatePost()
// UpdatePost("62359c107706e35a79103bbe")
// Like("62359c107706e35a79103bbe")
Comment("62359c107706e35a79103bbe", "Bai hay qua, cam on nha")
Comment("62359c107706e35a79103bbe", "Bai hay qua, cam on nha")
Comment("62359c107706e35a79103bbe", "Bai hay qua, cam on nha")
Comment("62359c107706e35a79103bbe", "Bai hay qua, cam on nha")