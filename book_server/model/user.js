const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Book = require('../model/book');

const User = sequelize.define('user', {
  userId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    unique: true
  },

 
});



module.exports = User;
