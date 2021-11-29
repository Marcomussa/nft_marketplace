const express = require('express')
const {check} = require('express-validator')
const mainController = require('../controller/mainController')
const userController = require('../controller/userController')
const guestMiddleware = require('../middleware/guestMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const multer = require('../middleware/multer')
const router = express.Router()

router.get('/', mainController.index)

router.get('/register', guestMiddleware, userController.register)

router.get('/login', guestMiddleware, userController.login)

router.get('/profile', authMiddleware, userController.userProfile)

router.get('/logout', userController.logout)

router.post('/login', userController.processLogIn)

router.post('/register', 
    multer.single('avatar'), 
    [
        check('name').notEmpty().bail().withMessage('Ingrese un Nombre')
    ],
userController.processRegister)

module.exports = router