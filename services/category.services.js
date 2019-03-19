const categoryModel = require('../models/category.models');

const categoryService = {
    addBookCategory:addBookCategory,
    bookCategories:bookCategories,
    getCategoryByName:getCategoryByName
}

function addBookCategory(req) {
    return new Promise((resolve,reject) => {
        categoryModel.addBookCategory(req).then((returnedData) => {
            resolve(returnedData);
        }).catch((error) => {
            reject(error);
        })
    });
}

function bookCategories() {
    return new Promise((resolve,reject) => {
        categoryModel.bookCategories().then((returnedData) => {
            resolve(returnedData);
        }).catch((error) => {
            reject(error);
        })
    });
}

function getCategoryByName(category) {
    return new Promise((resolve,reject) => {
        categoryModel.checkBookCategory(category).then((returnedData) => {
            resolve(returnedData);
        }).catch((error) => {
            reject(error);
        })
    });
}

module.exports  = categoryService;