const db = require('../db/db-connections');
const dbUtility = require('../db/db_utility');
const bcrypt = require('bcryptjs');

const userModel = {
    userLogin:userLogin,
    createUser:createUser,
    getAllUsers:getAllUsers,
    getUserByUsername:getUserByUsername,
    getUserById:getUserById
};

function userLogin(request){
    return new Promise((resolve,reject) => {
        db.query('select * from app_users where username = ?',request.body.userName, (error,result) =>{
            if(!!error){
                dbUtility.releaseConnection;
                reject(error);
            }else{ 
                //check if password matches       
                let encryptedPassword = result[0].password;
                let checkPassword = bcrypt.compareSync(request.body.userPassword, encryptedPassword);        
                if(!checkPassword) {                    
                    resolve("Invalid Login details. Username or password is wrong")
                }else{                    
                    //set login session
                    request.session.loggedin = true;
                    request.session.userame = request.body.userName;
                    dbUtility.releaseConnection;
                    resolve("User Logged in sucsessfully");
                }
            }
        })
    })
}

function createUser(userDetails) {
    return new Promise((resolve,reject) => {
        //check if username already exists for another user
        this.getUserByUsername(userDetails.username).then((data) => {
            if(data.length === 0) {
                
                let currentTime = Math.round((new Date()).getTime() / 1000);
                let password  =  bcrypt.hashSync(userDetails.userpassword);

                let insertValues = {
                    username: userDetails.username,
                    password: password,
                    created_by: userDetails.userID,
                    time_created: currentTime
                }

                db.query('INSERT INTO app_users SET ?',insertValues, (error,result) => {
                    if(!!error){
                        dbUtility.releaseConnection;
                        reject(error);
                    }else{
                        dbUtility.releaseConnection;
                        resolve("User "+userDetails.username+" created successfully");
                    }
                });
            }else{
                reject("Username Already exists, pick another one");
            }
        }).catch((error) => {
            reject(error)
        })
    })
}

function getAllUsers() {
    return new Promise((resolve,reject) => {
        db.query('SELECT user_id,username,created_by,time_created FROM app_users', (error,result) => {
            if(!!error) {
                dbUtility.releaseConnection;
                reject(error);
            }else{
                dbUtility.releaseConnection;
                resolve(result);
            }
        });
    });
}

function getUserById(userID) {
    return new Promise((resolve,reject) => {
        db.query('SELECT * FROM app_users WHERE user_id = ?', userID, (error,result) => {
            if(!!error) {
                dbUtility.releaseConnection;
                reject(error);
            }else{
                dbUtility.releaseConnection;
                resolve(result);
            }
        });
    });
}

function getUserByUsername (username) {
   return new Promise((resolve,reject) => {
       db.query('SELECT username FROM app_users WHERE username = ?', username, (error,result) => {
           if(!!error) {
               dbUtility.releaseConnection;
               reject(error);
           }else{
               dbUtility.releaseConnection;
               resolve(result);
           }
       });
   });
}

module.exports = userModel;