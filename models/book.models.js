const db = require('../db/db-connections');
const dbUtility = require('../db/db_utility');
const userModel = require('./user.models');
const categoryModel = require('./category.models');

bookModel = {
    addBook:addBook,
    rateBook:rateBook,
    updateBook:updateBook,
    deleteBook:deleteBook,
    getBookById:getBookById,
    getAllbooks:getAllbooks,
    addBookStock:addBookStock,
    getBookByName:getBookByName,
    getBookRatingByUser:getBookRatingByUser,
    getBookByNameForUpdate:getBookByNameForUpdate
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

function addBook(req) {
    return new Promise((resolve, reject) => {
        this.getBookByName(req.body.bookName).then((data) => {
            if(data.length ===  0){
                categoryModel.getCategoryById(req.body.categoryID).then((data) => {
                    if(data.length === 0){
                        reject("Invalid Category ID.")
                    }else{

                        userModel.getUserById(req.session.userid).then((data) => {
                            if(data.length === 0){
                                reject("Invalid User ID.")
                            }else{
                                let currentTime = Math.round((new Date()).getTime() / 1000);
                                let insertValues = {
                                    cat_id: req.body.categoryID,
                                    book_name: req.body.bookName,
                                    total_stock: '0',
                                    created_by: req.session.userid,
                                    time_created: currentTime
                                }

                                db.query('insert into books set ?',insertValues,(error,result) => {
                                    if(!!error){
                                        dbUtility.releaseConnection;
                                        reject(error)
                                    }else{
                                        dbUtility.releaseConnection;
                                        resolve("Book added Successfully");
                                    }
                                });
                            }
                        }).catch((error) => {
                            reject(error);
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

function rateBook(req) {
    console.log(req.session.userid);
    return new Promise((resolve, reject) => {               
        this.getBookRatingByUser(req.body.bookID,req.session.userid).then((data) => {
            if(data.length === 0) {
                let insertValues = {
                    book_id: req.body.bookID,
                    user_id: req.session.userid,
                    rating: req.body.ratingStar
                }
                db.query('insert into book_rating set ?',insertValues,(error,result) => {
                    if(!!error){
                        dbUtility.releaseConnection;
                        reject(error);
                    }else{
                        dbUtility.releaseConnection
                        resolve("Book Rated successfully");
                    }
                });
                
            }else{
                reject("User has rated this book before.");
            }
        }).catch((error) => {
            reject(error);
        });                
    });   
}

function updateBook(bookDetails) {
    return new Promise((resolve,reject) => {
       this.getBookById(bookDetails.bookID).then((data) => {
           if(data.length === 0){
                reject("Book with that ID does not exist. Please prodvide a valid bookID");
           }else{
                this.getBookByNameForUpdate(bookDetails.bookName,bookDetails.bookID).then((data) => {
                    if(data.length !== 0){
                        reject("Another book with same name exist. Please change bookName");
                    }else{
                        categoryModel.getCategoryById(bookDetails.categoryID).then((data) => {
                            if(data.length === 0){
                                reject("Category with that ID does not exist. Please prodvide a valid categoryID");
                            }else{ 
                                let insertValues = {
                                    cat_id: bookDetails.categoryID,
                                    book_name: bookDetails.bookName
                                }

                                db.query('update books SET ? where book_id = ?',[insertValues,bookDetails.bookID], (error,result) => {
                                    if(!!error){
                                       dbUtility.releaseConnection;
                                       reject(error); 
                                    }else{
                                        dbUtility.releaseConnection;
                                        resolve("Book Details updated succeefully");
                                    }
                                });
        
                            }
                        }).catch((error) => {
                            reject(error);
                        });
                    }
                }).catch((error) => {
                    reject(error);
                });
            }
       }).catch((error) => {
            reject(error);
        });
    });
}

function deleteBook(bookDetails){
    return new Promise((resolve,reject) => {
       this.getBookById(bookDetails.bookID).then((data) => {
           if(data.length === 0) {
                reject("Book with that ID does not exist. Please prodvide a valid bookID");
           } else {
               //build query to delete book and all its associated data in the db
                let delRatingQuery = `delete from book_rating where book_id = ?;`;
                let delStockQuery = `delete from book_stocking where book_id = ?;`;
                let delBookQuery = `delete from books where book_id = ?;`;
                let query = delRatingQuery+delStockQuery+delBookQuery;
                db.query(query,[bookDetails.bookID,bookDetails.bookID,bookDetails.bookID], (error,result) => {
                    if(!!error) {
                        dbUtility.releaseConnection;
                        reject(error);
                    }else{
                        dbUtility.releaseConnection
                        resolve("Book and all its associated data deleted successfully");
                    }
                })
           }
       }).catch((error) => {
           reject(error);
       }); 
    });
}

function addBookStock(req) {
    return new Promise((resolve,reject) => {
        this.getBookById(req.body.bookID).then((data) => {
            if(data.length === 0) {
                 reject("Book with that ID does not exist. Please prodvide a valid bookID");
            } else {
                
                let currentTime = Math.round((new Date()).getTime() / 1000);

                let insertValues = {
                    book_id: req.body.bookID,
                    qty_supplied: req.body.qty,
                    supply_date: req.body.supplyDate,
                    created_by: req.session.userid,
                    time_created: currentTime
                }
                db.query("INSERT INTO book_stocking SET ?",insertValues, (error,result) => {
                    if(!!error) {
                        dbUtility.releaseConnection;
                        reject(error);
                    }else{
                        //update total stock on books table
                        db.query('update books set total_stock = total_stock + ? where book_id = ?',
                        [req.body.qty,req.body.bookID], (error,result) => {
                            if(!!error) {
                                dbUtility.releaseConnection;
                                reject(error);
                            }else{
                                dbUtility.releaseConnection
                                resolve("Stock added successfully for Book");
                            }
                        });
                    }
                });
            }
        }).catch((error) => {
            reject(error);
        }); 
     });
}

function getBookById(bookID) {
    return new Promise((resolve, reject) => {
        db.query('select * from books where book_id = ?',bookID,(error, result) => {
            if(!!error){
                dbUtility.releaseConnection;
                reject(error);
            }else{
                dbUtility.releaseConnection;
                resolve(result);
            }
        });
    });
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
        });
    });
}

function getBookByNameForUpdate(bookName,bookID) {
    return new Promise((resolve, reject) => {
        db.query('select * from books where book_name = ? and book_id != ?',[bookName,bookID],(error, result) => {
            if(!!error){
                dbUtility.releaseConnection;
                reject(error);
            }else{
                dbUtility.releaseConnection;
                resolve(result);
            }
        });
    });
}

function getBookRatingByUser(bookID,userID) {
    return new Promise((resolve, reject) => {
        db.query('select * from book_rating where book_id = ? and user_id = ?',[bookID,userID],(error, result) => {
            if(!!error){
                dbUtility.releaseConnection;
                reject(error);
            }else{
                dbUtility.releaseConnection;
                resolve(result);
            }
        });
    });
}


module.exports = bookModel;