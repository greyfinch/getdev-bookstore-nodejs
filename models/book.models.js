const db = require('../db/db-connections');
const dbUtility = require('../db/db_utility');
const categoryModel = require('./category.models');

bookModel = {
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
    return new Promise((resolve,reject) => {
        db.query('select * from books', (error,result) => {
            if(!!error){
                dbUtility.releaseConnection;
                reject(error)
            }else{
                dbUtility.releaseConnection;
                resolve(result);
            }
        });
    });
}

function addBook(bookDetails) {
    return new Promise((resolve, reject) => {
        this.getBookByName(bookDetails.bookName).then((data) => {
            if(data.length ===  0){
                categoryModel.getCategoryById(bookDetails.categoryID).then((data) => {
                    if(data.length === 0){
                        reject("Invalid Category ID.")
                    }else{

                        let currentTime = Math.round((new Date()).getTime() / 1000);
                        let insertValues = {
                            cat_id: bookDetails.categoryID,
                            book_name: bookDetails.bookName,
                            total_stock: '0',
                            created_by: bookDetails.userID,
                            time_created: currentTime
                        }

                        db.query('insert into books set ?',insertValues,(error,result) => {
                            if(!!error){
                                dbUtility.releaseConnection;
                                reject(error)
                            }else{
                                dbUtility.releaseConnection;
                                resolve(result);
                            }
                        });
                    }
                }).catch((error) => {
                    reject(error);
                });
            }else{
                reject("Book Name already exists, pick another one.")
            }
        }).catch((error) => {
            reject(error)
        });
    });
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
    return new Promise((resolve, reject) => {
        db.query('select * from books where book_name = ?',bookName,(error, result) => {
            if(!!error){
                dbUtility.releaseConnection;
                reject(error);
            }else{
                dbUtility.releaseConnection;
                resolve(result);
            }
        })
    })
}


module.exports = bookModel;