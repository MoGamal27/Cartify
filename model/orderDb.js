const Sequelize = require('sequelize');
const db = require('../config/database-setup');
const User = require('./User'); 
const Cart = require('./Cart'); 

const Order = db.define('Order', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tax: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    shippingFee: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    subtotal: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    total: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('pending', 'failed', 'paid', 'delivered', 'canceled'), 
        allowNull: false,
        defaultValue: 'pending' 
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User, 
            key: 'id'
        }
    },
    cartId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Cart, 
            key: 'id'
        }
    }
});

module.exports = Order;
