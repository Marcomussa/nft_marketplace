const express = require('express')
const app = express()
const PORT = 4000
const router = require('./src/routes/routes')
const path = require('path')
const session = require('express-session')
const isLoggedMiddleware = require('./src/middleware/userLoggedMiddleware')
const cookie = require('cookie-parser')

//! USE
app.use(express.urlencoded({ 
    extended: false
}))

app.use(session({
    secret: 'S4T0',
    resave: false,
    saveUninitialized: false
}))

app.use(cookie())

app.use(express.json())

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(isLoggedMiddleware)

app.use('/', router)

//! SET
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'public/views'))

app.set('styles', path.join(__dirname, 'public/styles'))

//! Port:
app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})