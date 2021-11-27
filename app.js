const express = require('express')
const app = express()
const PORT = 4000

app.get('/', function(req,res){
    res.send('Working')
})

app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})