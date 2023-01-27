require('dotenv').config()

const express = require("express")
const { router } = require("./apiRouter")

const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require("cors")

const port = parseInt(process.env.PORT,10)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())



app.use(router)

app.listen(port,async () => {
    console.log(`Ecoute sur le port ${port}`)
})
