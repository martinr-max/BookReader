const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookBlogController');

router.get('/books', bookController.getAllBooks);
router.get('/book/:bookId', bookController.getBookById);
router.get('/search/:userId/:searchText', bookController.getBookBySearch);
router.get('/book/title/:userId/:title', bookController.getBookByTitle);
router.get('/booklist/:userId', bookController.getBooklist);
router.delete('/booklist/delete/:userId', bookController.deleteBook);
router.post('/booklist/:userId', bookController.addBookToList);


module.exports = router;