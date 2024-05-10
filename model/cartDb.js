const Sequelize = require('sequelize');
const db = require('../config/database-setup');
const User = require('./User'); 
const Product = require('./Product'); 

const Cart = db.define('Cart', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User, 
            key: 'id'
        }
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Product, 
            key: 'id'
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    remove: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false 
    },
    subtotal: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

module.exports = Cart;
