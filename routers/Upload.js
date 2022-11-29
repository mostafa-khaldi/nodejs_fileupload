const express = require('express')
const router = express.Router()
const { auth_data } = require('./Auth')
const fs = require('fs')
const fsx = require('fs-extra')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dirs = `${req.query.dir}/${req.query.subdir}`
        let path = 'uploads/' + dirs
        fsx.ensureDirSync(path)
        cb(null, path)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + '-REMOTEFILE-' + file.originalname.replace(/\s/g,'-'))
    }
})
const upload = multer({ storage })

router.post('/api/upload/single', auth_data, upload.single('file'), (req, res) => {
    try {
        res.send({ filename: `${req.protocol}://${req.headers.host}/${req.file.path}` })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Server error' })
    }
})

router.post('/api/upload/bulk', auth_data, upload.array('file'), (req, res) => {
    let paths = req.files.map(item => `${req.protocol}://${req.headers.host}/${item.path}`)
    res.send(paths)
})

router.delete('/api/image', auth_data, (req, res) => {
    let path = req.query.path.split(`${req.protocol}//${req.headers.host}/`)[1]
    fs.unlink(path, err => {
        if (err) {
            console.log(err)
            res.status(500).send({ message: 'Server error' })
        } else {
            res.status(200).send({ message: 'Image was removed' })
        }
    })
})



module.exports = router
