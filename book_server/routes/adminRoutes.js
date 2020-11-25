const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.post('/login', adminController.adminlogin)
router.post('/', adminController.createBook);
router.patch('/books/edit/:bookId', adminController.editBook);
router.delete('/books/delete/:bookId', adminController.deleteBook);

module.exports = router;