const User = require('../../models/User')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')

module.exports = {
    index: function(req, res){
        res.send(req.body)
    },
    form: function(req, res){
        res.render('form')
    },
    redirect: function(req,res){
        res.json({
            file: req.file,
            data: req.body
        })
    },
    validacionLogIn: function(req, res){
        let errors = validationResult(req)
        const validaciones = errors.array()

        if(!errors.isEmpty()){
            res.render('form', {
                data: req.body,
                validaciones
            })
            console.log(errors.array())
        }  else {
            let newUser = {
                name: req.body.name,
                surname: req.body.user,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: req.file.filename
            }
            User.create(newUser)
            res.json({
                newUser
            })
        }
    }
}