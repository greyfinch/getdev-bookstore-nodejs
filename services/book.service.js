const bookModel = require('../models/book.models');

bookService = {
    addBook:addBook,
    rateBook:rateBook,
    updateBook:updateBook,
    deleteBook:deleteBook,
    getBookById:getBookById,
    getAllbooks:getAllbooks,
    addBookStock:addBookStock,
    getBookByName:getBookByName
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

function addBook(bookDetails) {
    return new Promise((resolve, reject) => {
        bookModel.addBook(bookDetails).then((returnedData) => {
            resolve(returnedData);
        }).catch((error) => {
            reject(error);
        });
    })
}

function rateBook(rateDetails) {
    
}

function updateBook(bookDetails) {
    
}

function deleteBook(bookDetails){

}

function addBookStock(stockDetails) {
    
}

function getBookById(bookID) {
    
}

function getBookByName(bookName) {
    
}


module.exports = bookService;