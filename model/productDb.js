const Sequelize = require('sequelize')
const db = require('../config/database-setup')
const User = require('./userDb')

const Product = db.define('Product',{
     
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },

    description:{
        type: Sequelize.TEXT,
        allowNull: false
    },

    price:{
        type: Sequelize.INTEGER,
        allowNull: false
    },

    company:{
        type: Sequelize.ENUM('Amazon', 'Flipkart', 'Ebay'),
        allowNull: false,
    },

    category:{
        type: Sequelize.ENUM('men', 'women', 'kids'),
        allowNull: false
    },
   
    stock:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
     
    image:{
        type: Sequelize.BLOB,
        allowNull: false
    },

    UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    

})

module.exports = Product