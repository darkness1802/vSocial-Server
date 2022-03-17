const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
var bodyParser = require('body-parser')
const multer = require('multer')
const fs = require('fs')
const { Image } = require('./database')

app.use(express.static('public'));
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({ msg: "Hello" })
})

app.post('/post', upload.single('file'), async function (req, res) {

    let img = fs.readFileSync(`./public/${req.file.filename}`);

    var encode_image = img.toString('base64');

    var finalImg = {
        path: req.file.filename,
        source: new Buffer(encode_image, 'base64')
    };
    console.log(finalImg)

    Image.create({ path:finalImg.path, source: finalImg.source}).then(result => {
        res.status(200).json({ msg: "Complete" })
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "Error" })
    })
});

app.get("/images/:id", (req, res) => {
    let fid = req.params.id;
    console.log(fid);
    Image.findById(fid).then((result) => {
        let buffer = result.source
        fs.writeFile(`./public/${result.path}.jpg`, buffer, 'binary', function(err) {
            if (err) {
                
            } else {
                res.status(200).json(result)
            }
        })
    }).catch(err => { console.log(err) })
}) 

app.listen(1234, () => {
    console.log('Server listening on port 1234');
})