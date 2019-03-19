/*****
 * Define book controller
 * *****/
const bookService = require('../services/book.service');
const userService = require('../services/user.services');
const bookValidator = require('../utilities/book.validate');

//Book Controller
exports.getAllbooks = (req, res) => {
    bookService.getAllbooks().then((returnedData) => {
        res.send(returnedData);
    }).catch((error) => {
        res.send(error);
    });
}

exports.addBook = (req, res) => {
    //check if user is logged in
    userService.getUserSession(req).then((data) => {
        console.log(data);
        if(data) {
            //validate user inputs
            bookValidator.newBookValidator(req.body).then((validData) => {
                if(validData){
                    bookService.addBook(req).then((returnedData) => {
                        res.send(returnedData);
                    }).catch((error) => {
                        res.send(error);
                    });
                }
            }).catch((error) => {
                res.send(error);
            });
        }
    }).catch((error) => {
        res.send(error);
    });
}

exports.updateBook = (req, res) => {
    //check if user is logged in
    userService.getUserSession(req).then((data) => {
        if(data) {
            //validate user inputs
            bookValidator.updateBookValidator(req.body).then((validData) => {
                if(validData){
                    bookService.updateBook(req.body).then((returnedData) => {
                        res.send(returnedData);
                    }).catch((error) => {
                        res.send(error);
                    });
                }
            }).catch((error) => {
                res.send(error);
            });
        }
    }).catch((error) => {
        res.send(error);
    });
}

exports.deleteBook = (req, res) => {
    //check if user is logged in
    userService.getUserSession(req).then((data) => {
        if(data) {
            //validate user inputs
            bookValidator.deleteBookValidator(req.body).then((validData)=>{
                if(validData){
                    bookService.deleteBook(req.body).then((returnedData) => {
                        res.send(returnedData);
                    }).catch((error) => {
                        res.send(error);
                    });
                }
            }).catch((error) => {
                res.send(error);
            });
        }
    }).catch((error) => {
        res.send(error);
    });
}

exports.addBookStock = (req, res) => {
    //check if user is logged in
    userService.getUserSession(req).then((data) => {
        if(data) { 
            //vaidate user input           
            bookValidator.bookStockValidator(req.body).then((validData) => {
                if(validData){                    
                    bookService.addBookStock(req).then((returnedData) => {
                        res.send(returnedData);
                    }).catch((error) => {
                        res.send(error);
                    });
                }
            }).catch((error) => {
                res.send(error);
            });
        }
    }).catch((error) => {
        res.send(error);
    });
}

exports.rateBook = (req, res) => {
    //check if user is logged in
    userService.getUserSession(req).then((data) => {
        if(data) {
            //validate user inputs
            bookValidator.rateBookValidator(req.body).then((validData) => {
                if(validData){
                    bookService.rateBook(req).then((returnedData) => {
                        res.send(returnedData);
                    }).catch((error) => {
                        res.send(error);
                    });
                }
            }).catch((error) => {
                res.send(error);
            });
        }
    }).catch((error) => {
        res.send(error);
    });
}