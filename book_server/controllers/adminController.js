const Book = require('../model/book');
const User = require('../model/user');
const bcrypt = require("bcrypt");

const adminlogin = async (req, res, next) => {
	
  let user;
  try {
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
  } catch (err) {}
  if (!user) {
    res.status(401)
      .json({
        message: 'No user found'
      });
    res.redirect('/login');
    return;
  };
  let validpassword;
  try {
    validpassword = bcrypt.compareSync(req.body.password, user.password);
  } catch (err) {
    return res.status(401)
      .json({
        message: 'No user found'
      });
  }
  if (!validpassword) {
    return res.status(401)
      .json({
        message: 'Incorrect password'
      });
  }
  let roles;
  try {
    roles = await user.getRoles();
  } catch (err) {
    return res.status(401)
      .json({
        message: 'Did not find any roles'
      });
  }
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      return res.status(200)
        .json({
          id: user.userId,
          name: user.name,
          email: user.email,
          roles: roles,
        });
    }
    return res.status(400)
      .json({
        message: "Require admin role"
      })
  }
}

const createBook = async (req, res, next) => {
	
  const {
    title,
    author,
    imageUrl,
    year,
    pages,
    description
  } = req.body;
  let book;
  try {
    book = await Book.create({
      title,
      author,
      imageUrl,
      year,
      pages,
      description
    });
  } catch (err) {
    return status(400)
      .json({
        message: "Creating book failed"
      });
  }
  return res.status(201)
    .json(book);
};

const editBook = async (req, res, next) => {
	
  const {
    title,
    author,
    description,
    imageUrl,
    year,
    pages
  } = req.body;
	
  let updatedBook;
	
  try {
    updatedBook = await Book.update({
      title,
      author,
      description,
      imageUrl,
      year,
      pages
    }, {
      where: {
        id: req.params.bookId
      }
    });
  } catch (err) {
    return res.status(500)
      .json({
        message: "Book update failed"
      });
  }
  return res.status(200)
    .json(updatedBook);
}

const deleteBook = async (req, res) => {
  try {
    await Book.destroy({
      where: {
        id: req.params.bookId
      }
    });
  } catch (err) {
    return res.status(500)
      .json({
        message: "Book deleting failed"
      });
  }
  return res.status(200)
    .json({
      message: "book was deleted"
    });
};

exports.editBook = editBook;
exports.adminlogin = adminlogin;
exports.createBook = createBook;
exports.deleteBook = deleteBook;
