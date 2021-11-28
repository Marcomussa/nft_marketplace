const User = require('../../models/User')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')

module.exports = {
    index: function(req, res){
        res.send(req.body)
    },
    register: function(req, res){
        res.render('register')
    },
    login: function(req,res){
        res.render('login')
    },
    redirect: function(req,res){
        res.json({
            file: req.file,
            data: req.body
        })
    },
    processRegister: function(req, res){
        let errors = validationResult(req)
        const validaciones = errors.array()

        if(!errors.isEmpty()){
            res.render('register', {
                data: req.body,
                validaciones
            })
            console.log(errors.array())
        }  else {
            let hash = bcrypt.hashSync(req.body.password, 10)

            let userInDb = User.findByField('email', req.body.email)
            
            if (userInDb) {
                return res.render('register', {
                    errors: {
                        email: {
                            msg: 'Este email ya esta registrado'
                        }
                    }
                })
            }

            let newUser = {
                ...req.body,
                password: hash,
                avatar: req.file || 'null'
            }
            User.create(newUser)

            res.json({
                newUser
            })
        }
    },
    processLogIn: function(req, res){
        res.send(req.body)
    }
}