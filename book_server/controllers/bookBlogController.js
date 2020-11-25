const Book = require('../model/book');
const User = require('../model/user');
const { Op } = require("sequelize");


const getAllBooks = async  (req, res, next) => {
	let books;
	try {
		books = await Book.findAll();
	}
	catch(err) {
		return res.status(500).json({message: "Book search failed"});
	}
	
	if(books.length === 0) {
		return	res.status(400).json("no books in database");
	}

    return res.status(200).json(books);
};

const getBookBySearch = async (req, res) => {
	let book;
	let user;

	try {
		user = await User.findOne({where: {userId: req.params.userId}});
		book = await Book.findAll({where: {
		title: {[Op.like]: `%${req.params.searchText}%`}
	}});
	}

	catch(err) {
   		return res.status(400).json({ message: "Books not found." });
	}

	return res.status(200).json(book);

};

const getBookById = async (req, res) => {
	const id = req.params.bookId;
	let book;
  	try {
		book = await Book.findOne({ where: { id } });
  	} 
  	catch(err) {
		return res.status(400).json({ message: "Book not found." });
  	}

  	return res.status(200).json(book);

};


const getBookByTitle = async (req, res) => {
	const title = req.params.title;
	let user;
	let book;
	try {
		user = await User.findOne({where: {userId: req.params.userId}});
		book = await Book.findOne({ where: { title } });
	}
	catch(err) {
		return res.status(400).json('User not found');
	}

	if (book) {
		return res.status(200).json(book);

		} 
	else {
		return res.status(401).json({ message: "Book not found." })
	}
	 
};
  

const getBooklist = async (req, res, next) => {

	let user;
	let bookList;
	try {
		user = await User.findOne({where: {userId: req.params.userId}});
		bookList = await user.getBooks();
	}
	catch(err) {
		return res.status(500).json({error: "user not found"})
	}

	try {
		bookList = await user.getBooks();
	}
	catch(err) {
		return res.status(422).json({ message: 'Did not find any books' });

	}

	return res.status(200).json(bookList);

};
		

const addBookToList = async (req, res, next) => {
	const bookId = req.body.id;
	const userId = req.params.userId
	let bookToAdd;
	let user;
	try {
		bookToAdd  = await Book.findOne({where: {id: bookId}});
		user = await User.findOne({where: {userId: userId}})
	}
	catch(err) {
		return res.status(404).json({ error: { message: 'No Book or user was found.' }});
	}
	
	if (await  user.hasBook(bookToAdd)) {
		return res.status(422).json({ message: 'Book already added' });
	}

	try {
		await user.addBook(bookToAdd);
	}
	catch(err) {
		return res.status(401).json({ message: 'Adding book failed' });
	}

	return res.status(201).json(bookToAdd);
};

const deleteBook = async (req, res) => {
	const userId = req.params.userId;
	let bookId = req.body.id;

	let user;
	let booktoDelete;
	try {
		booktoDelete  = await Book.findOne({where: {id: bookId}});
		user = await User.findOne({where: {userId: userId}})			
	}
	catch(err) {
		return res.status(404).json({message: "no book or user found"})
	}

	try {
		await user.removeBook(booktoDelete);
	}
	catch(err) {
		return res.status(401).json({message: "Deleting book failed"})
	}
	return res.status(201).json(booktoDelete);
	
};

exports.getAllBooks = getAllBooks;
exports.getBookById = getBookById;
exports.getBookByTitle = getBookByTitle;
exports.getBooklist = getBooklist;
exports.addBookToList = addBookToList;
exports.deleteBook = deleteBook;
exports.getBookBySearch = getBookBySearch;