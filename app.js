
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const expressLayout = require('express-ejs-layouts')

const app = express()
const PORT = process.env.PORT || 8008
const connectDB = require('./server/config/dbconnect')

// connect to DB

connectDB()

// this will enable us to acess our public files and integrate them with ejs easily.
app.use(express.static('public'))

// Templating Engine

app.use(expressLayout)

app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

//  creating a link to the routes
const mainroute = require('./server/routes/mainroute')
app.use('/', mainroute)


app.listen(PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})