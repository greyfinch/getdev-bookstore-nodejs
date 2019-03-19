const joiValidate = require('joi');

const categoryValidator = {
    newCategoryValidator:newCategoryValidator
};

function newCategoryValidator(category) {
    //define validation schema
    let categorySchema = joiValidate.object().keys({
        categoryName: joiValidate.string().min(2).required().label("Category name cannot be empty. It must be at least 2 characters long")
    })

    return new Promise((resolve,reject) =>{
        // validate the category data against the categorySchema
        joiValidate.validate(category,categorySchema,(error,value) => {
            if(error){
                reject(error.message);
            }else{
                resolve(true);
            }
        });
    });    
}

module.exports = categoryValidator;