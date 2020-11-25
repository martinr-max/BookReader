const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bookBlogRoutes = require('./routes/bookBlogRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const sequalize = require('./util/database');
const Book = require('./model/book');
const User = require('./model/user');
const Role = require('./model/role');


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-headers',
      "origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-methods", "POST, GET, DELETE, PATCH ")

  next();
});

app.use('/api/bookBlog', bookBlogRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

User.belongsToMany(Book, { as: 'Books', through: 'booklist', foreignKey: 'userId', otherKey: 'bookId'});
Book.belongsToMany(User, { as: 'Users', through: 'booklist', foreignKey: 'bookId', otherKey: 'userId'});

User.belongsToMany(Role, { as: 'Roles', through: 'userRole', foreignKey: 'userId', otherKey: 'roleId'});
Role.belongsToMany(User, {as: 'Users', through: 'userRole', foreignKey: 'roleId', otherKey: 'userId' });

sequalize.sync()
.then(result => {
  //console.log('Drop and Resync Db');
  app.listen('8000')
})
.catch(err => console.log(err))

  
