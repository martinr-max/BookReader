const Sequalize = require('sequelize');

const sequelize = require('../util/database');

const Book = sequelize.define('book ', {
    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequalize.STRING,
    },
    author: {
        type: Sequalize.STRING,
    },
   
    imageUrl: {
        type: Sequalize.STRING,
    },
    year: {
        type: Sequalize.INTEGER
    },
    pages: {
        type: Sequalize.INTEGER
       
    },
    description: {
        type: Sequalize.TEXT,
    },
    
})


module.exports = Book;