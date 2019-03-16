exports.addBookCategory = (req, res) => {
    connectionPool.getConnection(function(err,connection) {
        //check if a category with the same category Name already exists.
        connection.query("SELECT cat_name FROM book_categories WHERE cat_name = ?", 
            [req.body.categoryName],            
            function(error, result, fields) {
            connection.on('error', (err) => {
                console.log('MySQL ERROR', err);
            });

            console.log(result);
        
            //check if query return any category
            if(result && result.length) {
                //Yes category already exist
                res.send(JSON.stringify({"OptStatus":"Operation failed. Book Category already exist"}));
                
            }else{
                //No category doesn't exist

                // get current time in timestamp
                let currentTime = Math.round((new Date()).getTime() / 1000);
                //populate insert values
                let insertValues = {
                    cat_name: req.body.categoryName,
                    created_by: req.body.userID,
                    time_created: currentTime
                }

                let query = "INSERT INTO book_categories SET ?";

                connection.query(query,insertValues,function(error, result) {
                    connection.on('error', function(err) {
                        console.log('MySQL ERROR', err);
                    });
                    
                    if(error) {
                        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                    }else {                    
                        res.send(JSON.stringify({"OptStatus": "Good. Category added successfully"}));
                    }                   
                });
            }
            connection.release();
        }); 

    });
}

exports.bookCategories = (req, res) => {
    let query = `select * from book_categories`;
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
