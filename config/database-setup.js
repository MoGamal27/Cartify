const Sequelize = require('sequelize')
require('dotenv').config

module.exports = new Sequelize(
    process.env.DB_DATABASE,
     process.env.DB_USER,
      process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect:  'postgres'
  });