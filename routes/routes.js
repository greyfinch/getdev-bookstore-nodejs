//Load needed modules
const express = require('express'),
        routes = express.Router();
const UserController = require('../controllers/user-controller');
const CategoryController = require('../controllers/book-category-controller');
const BookController = require('../controllers/book-controller');

//define App routes
routes.get('/', (req, res) => { return res.send('Welcome to getDev Book Store') });
routes.get('/users', UserController.allUsers)
routes.post('/createuser', UserController.createUser);
routes.get('/bookcategories', CategoryController.bookCategories)
routes.post('/addbookcategory', CategoryController.addBookCategory);
routes.get('/books', BookController.books);
routes.post('/addbook', BookController.addBook);
routes.put('/updatebook', BookController.updateBook);
routes.delete('/deletebook', BookController.deleteBook);
routes.post('/addstock', BookController.addBookStock);
routes.post('/ratebook', BookController.rateBook);

module.exports = routes;