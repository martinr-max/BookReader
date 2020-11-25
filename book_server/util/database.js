const Sequalize = require('sequelize');

const sequalize = new Sequalize('book-blog', 'root', 'Ukumasing1', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequalize;