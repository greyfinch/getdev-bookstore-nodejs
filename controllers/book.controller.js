const bookService = require('../services/book.service');

//Book Controller
exports.getAllbooks = (req, res) => {
    bookService.getAllbooks().then((returnedData) => {
        res.send(returnedData);
    }).catch((error) => {
        res.send(error);
    });
}

exports.addBook = (req, res) => {
    bookDetails = req.body;
    bookService.addBook(bookDetails).then((returnedData) => {
        res.send(returnedData);
    }).catch((error) => {
        res.send(error);
    });
}

exports.updateBook = (req, res) => {
    if(req.session.loggedin) {
        connectionPool.getConnection(function(err,connection) {
            //check if a user with the same username already exists.
            connection.query("SELECT book_id FROM books WHERE book_id = ?", 
                [req.body.bookID],            
                function(error, result, fields) {
                connection.on('error', (err) => {
                    console.log('MySQL ERROR', err);
                });

                console.log(result);
            
                //check if book exists
                if(result && result.length) {                
                    //Yes it exists

                    //check if category exists
                    connection.query("SELECT cat_id FROM book_categories WHERE cat_id = ?",
                    [req.body.categoryID],function(error, result) {
                        connection.on('error', function(err) {
                            console.log('MySQL ERROR', err);
                        });
                        
                        if(result && result.length) {                      
                            //update the book details
                            let insertValues = {
                                cat_id: req.body.categoryID,
                                book_name: req.body.bookName,
                            }

                            connection.query("update books SET ? where book_id = ?",
                            [insertValues,req.body.bookID],function(error, result) {
                                connection.on('error', function(err) {
                                    console.log('MySQL ERROR', err);
                                });
                                
                                if(error) {
                                    res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                                }else {     
                                    res.send(JSON.stringify({"OptStatus": "Good. Book updated successfully"}));                       
                                }                   
                            });
                        }else {     
                            //Nope Book doesn't exist
                            res.send(JSON.stringify({"OptStatus":"Operation failed. Invalid Category ID"}));                    
                        }                   
                    });
                }else{
                    //Nope Book doesn't exist
                    res.send(JSON.stringify({"OptStatus":"Operation failed. Invalid Book ID"}));
            }
                connection.release();
            }); 

        });
    }else{
        res.send(JSON.stringify({"OptStatus": "Failed. You're not logged in"}));
    }
}

exports.deleteBook = (req, res) => {
    if(req.session.loggedin) {
        connectionPool.getConnection(function(err,connection) {
            //check if a user with the same username already exists.
            connection.query("SELECT book_id FROM books WHERE book_id = ?", 
                [req.body.bookID],            
                function(error, result, fields) {
                connection.on('error', (err) => {
                    console.log('MySQL ERROR', err);
                });

                console.log(result);
            
                //check if book exists
                if(result && result.length) {                
                    //Yes it exists
                    //run this multiple query to delete all items associated to this bookID
                    let query = `delete from book_rating where book_id = ?;
                                delete from book_stocking where book_id = ?;
                                delete from books where book_id = ?`
                    connection.query(query,[req.body.bookID,req.body.bookID,req.body.bookID],
                    function(error, result) {
                        connection.on('error', function(err) {
                            console.log('MySQL ERROR', err);
                        });

                        if(error) {
                            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                        }else {     
                            res.send(JSON.stringify({"OptStatus": "Good. Book and all associated data deleted successfully"}));                       
                        }                                      
                    });
                }else{
                    //Nope Book doesn't exist
                    res.send(JSON.stringify({"OptStatus":"Operation failed. Invalid Book ID"}));
            }
                connection.release();
            }); 

        });
    }else{
        res.send(JSON.stringify({"OptStatus": "Failed. You're not logged in"}));
    }
}

exports.addBookStock = (req, res) => {
    if(req.session.loggedin) {
        connectionPool.getConnection(function(err,connection) {
            //check if a user with the same username already exists.
            connection.query("SELECT book_id FROM books WHERE book_id = ?", 
                [req.body.bookID],            
                function(error, result, fields) {
                connection.on('error', (err) => {
                    console.log('MySQL ERROR', err);
                });

                console.log(result);
            
                //check if book exists
                if(result && result.length) {                
                    //Yes it exists
                    let currentTime = Math.round((new Date()).getTime() / 1000);

                    let insertValues = {
                        book_id: req.body.bookID,
                        qty_supplied: req.body.qty,
                        supply_date: req.body.supplyDate,
                        created_by: req.body.userID,
                        time_created: currentTime
                    }

                    connection.query("INSERT INTO book_stocking SET ?",insertValues,function(error, result) {
                        connection.on('error', function(err) {
                            console.log('MySQL ERROR', err);
                        });
                        
                        if(error) {
                            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                        }else {     
                            //if add is successfull, then update books table
                            connection.query("update books set total_stock = total_stock + ? where book_id = ?",
                            [req.body.qty,req.body.bookID],function(error, result){
                                if(error){
                                    res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                                }else {
                                    res.send(JSON.stringify({"OptStatus": "Good. Stock added successfully"}));
                                }
                            });                        
                        }                   
                    });
                }else{
                    //Nope Book doesn't exist
                    res.send(JSON.stringify({"OptStatus":"Operation failed. Invalid Book ID"}));
            }
                connection.release();
            }); 

        });
    }else{
        res.send(JSON.stringify({"OptStatus": "Failed. You're not logged in"}));
    }
}


exports.rateBook = (req, res) => {
    if(req.session.loggedin) {
        connectionPool.getConnection(function(err,connection) {
            //check if a book with the same bookID exists.
            connection.query("SELECT book_id FROM books WHERE book_id = ?", 
                [req.body.bookID],            
                function(error, result, fields) {
                connection.on('error', (err) => {
                    console.log('MySQL ERROR', err);
                });

                console.log(result);
            
                //check if book exists
                if(result && result.length) {                
                    //Yes it exists

                    //Users can only rate once, so check if user has rated before
                    connection.query("SELECT book_id, user_id FROM book_rating WHERE book_id = ? and user_id = ?",
                    [req.body.bookID,req.body.userID],function(error, result){
                        if(result && result.length){
                            res.send(JSON.stringify({"OptStatus": "Operation failed. User has rated this book before. User cannot rate more than once for each book"}));
                        }else {                            

                            let insertValues = {
                                book_id: req.body.bookID,
                                user_id: req.body.userID,
                                rating: req.body.ratingStar
                            }

                            connection.query("INSERT INTO book_rating SET ?",insertValues,function(error, result) {
                                connection.on('error', function(err) {
                                    console.log('MySQL ERROR', err);
                                });
                                
                                if(error) {
                                    res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                                }else {     
                                    //if add is successfull, then update books table
                                    connection.query("update books set total_stock = total_stock + ? where book_id = ?",
                                    [req.body.qty,req.body.bookID],function(error, result){
                                        if(error){
                                            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                                        }else {
                                            res.send(JSON.stringify({"OptStatus": "Good. Book rated successfully"}));
                                        }
                                    });                        
                                }                   
                            });
                        }
                    });
                }else{
                    //Nope Book doesn't exist
                    res.send(JSON.stringify({"OptStatus":"Operation failed. Invalid Book ID"}));
            }
                connection.release();
            }); 
        });
    }else{
        res.send(JSON.stringify({"OptStatus": "Failed. You're not logged in"}));
    }
}