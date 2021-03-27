const express = require('express');
const app = express();
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require('cors')
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {

        const fileName = `${Date.now()}.jpeg`
        req.body.photo = fileName
        cb(null, fileName)
    }
})

var upload = multer({ storage: storage })

mongoose.connect(`mongodb://localhost:27017/file-handler`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log(`DB connect Successfully`)
}).catch(err => {
    console.log(err)
    console.log(`DB connection fail`)
});
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))
const photoSchema = new mongoose.Schema({
    photo: String
})

const photoModel = mongoose.model('photo', photoSchema)

app.post('/', upload.single('photo'), async (req, res) => {
    try {
        console.log(req.file)
        const data = await photoModel.create(req.body)
        res.status(201).json({
            data
        })
    } catch (err) {
        console.log(err)
    }
})

app.get('/:id', async (req, res) => {
    try {
        const data = await photoModel.findById(req.params.id);
        res.status(200).json({ data })
    } catch (err) {
        console.log(err)
    }
})
const port = 8000
app.listen(port, () => {
    console.log(`listening`)
})