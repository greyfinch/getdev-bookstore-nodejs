const bookModel = require('../models/book.models');

bookService = {
    addBook:addBook,
    rateBook:rateBook,
    updateBook:updateBook,
    deleteBook:deleteBook,
    getAllbooks:getAllbooks,
    addBookStock:addBookStock
}

function getAllbooks() {
   return new Promise((resolve, reject) => {
       bookModel.getAllbooks().then((returnedData) => {
           resolve(returnedData);
       }).catch((error) => {
           reject(error);
       });
   });
}

function addBook(req) {
    return new Promise((resolve, reject) => {
        bookModel.addBook(req).then((returnedData) => {
            resolve(returnedData);
        }).catch((error) => {
            reject(error);
        });
    })
}

function rateBook(req) {
    return new Promise((resolve, reject) => {
        bookModel.rateBook(req).then((returnedData) => {
            resolve(returnedData);
        }).catch((error) => {
            reject(error);
        });
    })  
}

function updateBook(bookDetails) {
    return new Promise((resolve, reject) => {
        bookModel.updateBook(bookDetails).then((returnedData) => {
            resolve(returnedData);
        }).catch((error) => {
            reject(error);
        });
    })  
}

function deleteBook(bookDetails){
    return new Promise((resolve, reject) => {
        bookModel.deleteBook(bookDetails).then((returnedData) => {
            resolve(returnedData);
        }).catch((error) => {
            reject(error);
        });
    }) 
}

function addBookStock(req) {
    return new Promise((resolve, reject) => {
        bookModel.addBookStock(req).then((returnedData) => {
            resolve(returnedData);
        }).catch((error) => {
            reject(error);
        });
    }) 
}


module.exports = bookService;