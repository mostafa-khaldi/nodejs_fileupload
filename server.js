const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')

const upload = require('./routers/Upload')

/* PORT */
const PORT = process.env.PORT || 8000


/* ENV */
dotenv.config()

/* MiddleWare */
app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf
    }
}))
app.use(cors())

/* Routers */
app.use('/', upload)

/* Starting app */
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
    app.use('/uploads', express.static('uploads'));
}

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.listen(PORT)
