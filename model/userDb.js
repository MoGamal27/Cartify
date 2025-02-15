const Sequelize = require('sequelize')
const db = require('../config/database-setup')

const User = db.define('User',{
    
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },

    email:{
        type: Sequelize.STRING,
        allowNull: false
    },

    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = User;



