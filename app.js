const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.get('/', (req, res) => {
    res.json({ msg: "Hello" })
})

app.listen(1234, () => {
    console.log('Server listening on port 1234');
})