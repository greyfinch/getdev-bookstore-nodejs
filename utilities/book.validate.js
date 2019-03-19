const joiValidate = require('joi');
const joiExtensions = require('joi-date-extensions');
const joiDateValidate = joiValidate.extend(joiExtensions);

const bookValidator = {
    newBookValidator:newBookValidator,
    updateBookValidator:updateBookValidator,
    rateBookValidator:rateBookValidator,
    deleteBookValidator:deleteBookValidator,
    bookStockValidator:bookStockValidator
}

function newBookValidator(book) {
    let bookSchema = joiValidate.object().keys({
        categoryID: joiValidate.number().required().label("Category cannot be empty. It must be a number"),
        bookName: joiValidate.string().min(2).required().label("Book name cannot be empty. It must be at least 2 characters long")
    })

    return new Promise((resolve,reject) =>{
        // validate the category data against the categorySchema
        joiValidate.validate(book,bookSchema,(error,value) => {
            if(error){
                reject(error.message);
            }else{
                resolve(true);
            }
        });
    });
}

function updateBookValidator(book) {
    let bookSchema = joiValidate.object().keys({
        bookID: joiValidate.number().required().label("Book ID cannot be empty. It must be a number"),
        categoryID: joiValidate.number().required().label("Category cannot be empty. It must be a number"),
        bookName: joiValidate.string().min(2).required().label("Book name cannot be empty. It must be at least 2 characters long")
    })

    return new Promise((resolve,reject) =>{
        // validate the category data against the categorySchema
        joiValidate.validate(book,bookSchema,(error,value) => {
            if(error){
                reject(error.message);
            }else{
                resolve(true);
            }
        });
    });
}

function rateBookValidator(rating) {

    let ratingSchema = joiValidate.object().keys({
        bookID: joiValidate.number().required().label("Book ID cannot be empty. It must be a number"),
        ratingStar: joiValidate.string().valid(['1 star','2 stars','3 stars','4 stars','5 stars']).required().label("Rating cannot be empty. It must be either one of \"'1 star','2 stars','3 stars','4 stars','5 stars'\" ")
    })

    return new Promise((resolve,reject) =>{
        // validate the category data against the categorySchema
        joiValidate.validate(rating,ratingSchema,(error,value) => {
            if(error){
                reject(error.message);
            }else{
                resolve(true);
            }
        });
    });
}

function deleteBookValidator(book) {
    let bookSchema = joiValidate.object().keys({
        bookID: joiValidate.number().required().label("Book ID cannot be empty. It must be a number")
    });

    return new Promise((resolve,reject) =>{
        // validate the category data against the categorySchema
        joiValidate.validate(book,bookSchema,(error,value) => {
            if(error){
                reject(error.message);
            }else{
                resolve(true);
            }
        });
    });
}

function bookStockValidator(stock) {
    
    //defind validation schema
    let stockSchema = joiValidate.object().keys({
        bookID: joiValidate.number().required().label("BookID is required. It must be a number"),
        qty: joiValidate.number().required().label("QTY is required. It must be a number"),
        supplyDate: joiDateValidate.date().format('YYYY-MM-DD').min('2019-01-01').iso().required().label("Date is required. Must be in format YYYY-MM-DD. Must not be less then 2019-01-01.")
    });

    return new Promise((resolve, reject) => {
        // validate the category data against the stockSchema
        joiValidate.validate(stock, stockSchema, (error,value) => {
            if(error){
                reject(error.message);
            }else{
                resolve(true);
            }
        });
    });
}


module.exports = bookValidator;