const express = require('express')
const app = express()
const PORT = 4000
const router = require('./src/routes/routes')
const path = require('path')

//! USE
app.use(express.urlencoded({ 
    extended: false
}))
app.use(express.json())

app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/', router)

//! SET
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'public/views'))

app.set('styles', path.join(__dirname, 'public/styles'))

//! Port:
app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})