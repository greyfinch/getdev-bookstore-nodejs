/*****
 * Define user model
 * *****/

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

function userLogin(req) {
    return new Promise((resolve,reject) => {
        //check if user exists in db
        db.query('select * from app_users where username = ?',req.body.userName, (error,result) =>{
            if(!!error){ //if user does not exists, run these lines
                dbUtility.releaseConnection;
                reject(error);
            }else{ //if user exists, run these lines
                //check if password matches       
                let encryptedPassword = result[0].password;
                let checkPassword = bcrypt.compareSync(req.body.userPassword, encryptedPassword);        
                if(!checkPassword) {   //if password does not match                  
                    resolve("Invalid Login details. Username or password is wrong")
                }else{                    
                    //set login session
                    req.session.loggedin = true;
                    req.session.userame = req.body.userName;
                    req.session.userid = result[0].user_id;
                    dbUtility.releaseConnection;
                    resolve("User Logged in sucsessfully");
                }
            }
        })
    })
}

function createUser(req) {
    return new Promise((resolve,reject) => {
        //check if username already exists for another user
        this.getUserByUsername(req.body.username).then((data) => {
            if(data.length === 0) {
                
                let currentTime = Math.round((new Date()).getTime() / 1000);
                let password  =  bcrypt.hashSync(req.body.userpassword);

                let insertValues = {
                    username: req.body.username,
                    password: password,
                    created_by: req.session.userid,
                    time_created: currentTime
                }
                //insert new user record into db
                db.query('INSERT INTO app_users SET ?',insertValues, (error,result) => {
                    if(!!error){
                        dbUtility.releaseConnection;
                        reject(error);
                    }else{
                        dbUtility.releaseConnection;
                        resolve("User "+req.body.username+" created successfully");
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