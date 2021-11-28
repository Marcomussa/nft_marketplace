const express = require('express')
const multer = require('multer')
const path = require('path')
const {check} = require('express-validator')
const mainController = require('../controller/mainController')
const userController = require('../controller/userController')
const router = express.Router()

//! Multer:
let storage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder = path.join(__dirname, '../../public/img/avatars')
        cb(null, folder)
    },
    filename: function(req, file, cb){
        let imageName = Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
})
const upload = multer({ 
    storage
})

router.get('/', mainController.index)

router.get('/form', userController.form)

router.post('/redirect', 
    upload.single('avatar'), 
    [
        check('name').notEmpty().bail().withMessage('Ingrese un Nombre')
    ],
    userController.validacionLogIn)

module.exports = router