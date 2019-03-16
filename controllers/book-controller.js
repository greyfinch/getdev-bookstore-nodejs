//Book Controller
exports.books = (req, res) => {
    let query = `select * from books`;
     connectionPool.getConnection(function(err,connection) {
        
        connection.query(query,function(error, result){
            if(error){
                res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            }else {
                res.send(result);
            }
            connection.release();
        });
    });
}

exports.addBook = (req, res) => {
    connectionPool.getConnection(function(err,connection) {

        //check if this category exits
        connection.query("SELECT cat_id FROM book_categories WHERE cat_id = ?", 
            [req.body.categoryID],function(error, result) {
            connection.on('error', function(err) {
                console.log('MySQL ERROR', err);
            });
            
            if(result.length==0) {
                //Category does not exist
                res.send(JSON.stringify({"OptStatus":"Operation failed. invalid Category ID"}));
            } else {
                //check if a category with the same category Name already exists.
                connection.query("SELECT cat_id, book_name FROM books WHERE cat_id = ? and book_name = ?", 
                [req.body.categoryID,req.body.bookName],            
                function(error, result, fields) {
                    connection.on('error', (err) => {
                        console.log('MySQL ERROR', err);
                    });

                    console.log(result);
                
                    //check if query return any category
                    if(result && result.length) {
                        //Yes category already exist
                        res.send(JSON.stringify({"OptStatus":"Operation failed. Book with the same name already exist in this category", "result": result}));
                        
                    }else{
                        //No category doesn't exist

                        // get current time in timestamp
                        let currentTime = Math.round((new Date()).getTime() / 1000);
                        //populate insert values
                        let insertValues = {
                            cat_id: req.body.categoryID,
                            book_name: req.body.bookName,
                            total_stock: '0',
                            created_by: req.body.userID,
                            time_created: currentTime
                        }

                        let query = "INSERT INTO books SET ?";

                        connection.query(query,insertValues,function(error, result) {
                            connection.on('error', function(err) {
                                console.log('MySQL ERROR', err);
                            });
                            
                            if(error) {
                                res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                            }else {                    
                                res.send(JSON.stringify({"OptStatus": "Good. Book added successfully"}));
                            }                   
                        });
                    }
                    connection.release();
                });
            }                
        });
    });
}

exports.updateBook = (req, res) => {
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
}

exports.deleteBook = (req, res) => {
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
}

exports.addBookStock = (req, res) => {
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
}
exports.rateBook = (req, res) => {
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
}