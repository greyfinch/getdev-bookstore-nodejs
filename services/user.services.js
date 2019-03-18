const userModel = require('../models/user.models');

const userServices = {
    userLogin:userLogin,
    createUser:createUser,
    getAllUsers:getAllUsers,
    getUserByUsername:getUserByUsername,
    getUserById:getUserById
};

function userLogin(credentials) {
    return new Promise((resolve,reject) => {
        userModel.userLogin(credentials).then((returnedData) => {
            resolve(returnedData);
        }).catch((error) => {
            reject(error);
        })
    })
}

function createUser(userDetails) {
    return new Promise((resolve,reject) => {
        userModel.createUser(userDetails).then((returnData) => {
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

module.exports = userServices;