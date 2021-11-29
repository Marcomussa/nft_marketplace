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
        check('name').notEmpty().bail().withMessage('Ingrese un Nombre'),
        check('surname').notEmpty().bail().withMessage('Ingrese un Apellido'),
        check('email').notEmpty().bail().withMessage('Ingrese un Email').bail().isEmail().withMessage('Formato Email Invalido'),
        check('password').notEmpty().bail().withMessage('Ingrese un Pass Valido')
    ],
userController.processRegister)

//! A implementar:
// body('avatar').custom((value, { req }) => {
//     let file = req.file;
//     let acceptedExtensions = ['.jpg', '.png', '.gif'];

//     if (!file) {
//         throw new Error('Tienes que subir una imagen');
//     } else {
//         let fileExtension = path.extname(file.originalname);
//         if (!acceptedExtensions.includes(fileExtension)) {
//             throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
//         }
//     }

//     return true;
// })

module.exports = router