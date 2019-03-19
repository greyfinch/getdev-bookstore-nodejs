const db = require('../db/db-connections');
const dbUtility = require('../db/db_utility');

categoryModel = {
    addBookCategory:addBookCategory,
    bookCategories:bookCategories,
    getCategoryByName:getCategoryByName,
    getCategoryById:getCategoryById
};

function addBookCategory(req) {
    console.log(req.body);
    return new Promise((resolve,reject) => {
        this.getCategoryByName(req.body.categoryName).then((data) => {
            console.log(data)
            if(data.length === 0) {
               let currentTime = Math.round((new Date()).getTime() / 1000);
                let insertValues = {
                    cat_name: req.body.categoryName,
                    created_by: req.session.userid,
                    time_created: currentTime
                }
                db.query('insert into book_categories set ?',insertValues, (error, result) => {
                    if(!!error){
                        dbUtility.releaseConnection;
                        reject(error);
                    }else{
                        dbUtility.releaseConnection;
                        resolve(result);
                    }
                });

            }else{
                reject("Category Name Already exists, pick another one");
            }
        }).catch((error) => {
            reject(error);
        });
    });
}

function bookCategories() {
    return new Promise((resolve,reject) => {
        db.query('SELECT * FROM book_categories', (error, result) => {
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

function getCategoryByName(categoryName) {
    return new Promise((resolve,reject) => {
        db.query('SELECT cat_name FROM book_categories WHERE cat_name = ?',categoryName, (error, result) => {
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

function getCategoryById(categoryID) {
    return new Promise((resolve,reject) => {
        db.query('SELECT cat_id FROM book_categories WHERE cat_id = ?',categoryID, (error, result) => {
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

module.exports = categoryModel;