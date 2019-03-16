//Load needed modules
const express = require('express'),
        routes = express.Router();
const UserController = require('../controllers/user-controller');
const CategoryController = require('../controllers/book-category-controller');
const BookController = require('../controllers/book-controller');

/*
    * Define Application Routes
*/

//Home Page
routes.get('/', (req, res) => { return res.send('Welcome to getDev Book Store') });
//Retrive All users
routes.get('/users', UserController.allUsers);
//Create a new user
routes.post('/createuser', UserController.createUser);
//Retrive all book categories
routes.get('/bookcategories', CategoryController.bookCategories);
//Add a new Category of book
routes.post('/addbookcategory', CategoryController.addBookCategory);
//Retrive all added book
routes.get('/books', BookController.books);
//Add a new book
routes.post('/addbook', BookController.addBook);
//Update the details of a book
routes.put('/updatebook', BookController.updateBook);
//Delete a book and all associated data to it
routes.delete('/deletebook', BookController.deleteBook);
//Add a new stock for any book
routes.post('/addstock', BookController.addBookStock);
//Rate a book
routes.post('/ratebook', BookController.rateBook);

//Make route module accessible from other modules
module.exports = routes;