const userModel = require('../models/user.models');

const userServices = {
    userLogin:userLogin,
    createUser:createUser,
    getAllUsers:getAllUsers,
    getUserByUsername:getUserByUsername,
    getUserById:getUserById,
    getUserSession:getUserSession
};

function userLogin(req) {
    return new Promise((resolve,reject) => {
        userModel.userLogin(req).then((returnedData) => {
            resolve(returnedData);
        }).catch((error) => {
            reject(error);
        })
    })
}

function createUser(req) {
    return new Promise((resolve,reject) => {
        userModel.createUser(req).then((returnData) => {
            resolve(returnData);
        }).catch((error) => {
            reject(error);
        });
    });
}

function getAllUsers() {
    return new Promise((resolve,reject) => {
        userModel.getAllUsers().then((returnedData) => {
            resolve(returnedData);
        }).catch((error) => {
            reject(error);
        });
    });
}

function getUserByUsername (username) {
    return new Promise((resolve,reject) => {
        userModel.getUserByUsername(username).then((returnedData) => {
            resolve(returnedData);
        }).catch((error) => {
            reject(error);
        });
    });
}

function getUserById(userID) {
    return new Promise((resolve,reject) => {
        userModel.getUserById(userID).then((returnedData) => {
            resolve(returnedData);
        }).catch((error) => {
            reject(error);
        });
    });
}

function getUserSession(request) {
    return new Promise((resolve,reject) => {
        if(request.session.loggedin) {
            resolve(true)
        }else{
            reject("Please login to complete this operation");
        }
    })
}

module.exports = userServices;