const fs = require("fs")
const path = require('path')

const User = {
    filename: './users.json',

    getData: function(){
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, `../db/${this.filename}`), 'utf-8'))
    },
    
    findAll: function(){
        return this.getData()
    },

    generateId: function(){
        let allUsers = this.findAll()
        let lastUser = allUsers.pop()
        if(lastUser){
            return lastUser.id + 1
        }
        return 1
    },

    findByPk: function(id){
        let allUsers = this.findAll()
        let userFound = allUsers.find(user => user.id === id)
        return userFound
    },

    findByField: function(field, text){
        let allUsers = this.findAll()
        let userFound = allUsers.find(user => user[field] === text)
        return userFound
    }, 

    create: function(userData){
        let allUsers = this.findAll()
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser)
        fs.writeFileSync(path.resolve(__dirname, `../db/${this.filename}`), JSON.stringify(allUsers, null, ' '))  
        return newUser
    },

    delete: function(id){
        let allUsers = this.findAll()
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id)
        fs.writeFileSync(path.resolve(__dirname, `../../db/${this.filename}`), JSON.stringify(finalUsers, null, ' '))  
        return true   
    }
}

module.exports = User