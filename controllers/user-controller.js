const bcrypt = require('bcryptjs');

exports.createUser = (req, res) => {
    connectionPool.getConnection(function(err,connection) {
        //check if a user with the same username already exists.
        connection.query("SELECT username FROM app_users WHERE username = ?", 
            [req.body.username],            
            function(error, result, fields) {
            connection.on('error', (err) => {
                console.log('MySQL ERROR', err);
            });

            console.log(result);
        
            //check if query return any user
            if(result && result.length) {
                //Yes user already exist
                res.send(JSON.stringify({"OptStatus":"Operation failed. User already exist"}));
                
            }else{
                //No user doesn't exist
                let currentTime = Math.round((new Date()).getTime() / 1000);
                let password  =  bcrypt.hashSync(req.body.userpassword);

                let insertValues = {
                    username: req.body.username,
                    password: password,
                    created_by: req.body.userID,
                    time_created: currentTime
                }

                let query = "INSERT INTO app_users SET ?";

                connection.query(query,insertValues,function(error, result) {
                    connection.on('error', function(err) {
                        console.log('MySQL ERROR', err);
                    });
                    
                    if(error) {
                        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
                    }else {                    
                        res.send(JSON.stringify({"OptStatus": "Good. User added successfully"}));
                    }                   
                });
            }
            connection.release();
        }); 

    });
}

exports.allUsers = (req, res) => {
    let query = `select * from app_users`;
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