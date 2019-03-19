const joiValidator = require('joi');

const userValidator = {
    newUserValidator:newUserValidator,
    userLoginValidator:userLoginValidator
};

function userLoginValidator(user) {   
    //define validation schema
    let userSchema = joiValidator.object().keys({
        userName: joiValidator.string().min(3).max(30).required().label("Username can cannot be empty. Can only be a string and must be between 3 - 30 characters long"),
        userPassword: joiValidator.string().required()
    });
    
    return new Promise((resolve,reject) => {
        // validate the user data against the userSchema
        joiValidator.validate(user, userSchema, (error, value) => {
            if (error) {
                // send a 422 error response if validation fails
                reject(error.message);
            } else {
                console.log(value);
                resolve(true);
            }

        });
    });
}



function newUserValidator(user) {
    console.log(user);    
    //define validation schema
    let userSchema = joiValidator.object().keys({
        username: joiValidator.string().min(3).max(30).required().label("Username can cannot be empty. Can only be a string and must be between 3 - 30 characters long"),
        userpassword: joiValidator.string().min(6).max(30).label("Password can cannot be empty. Can only be string and must be between 6 - 30 characters long")
    });
    
    return new Promise((resolve,reject) => {
        // validate the user data against the userSchema
        joiValidator.validate(user, userSchema, (error, value) => {
            if (error) {
                // send a 422 error response if validation fails
                reject(error.message);
            } else {
                console.log(value);
                resolve(true);
            }

        });
    });
}

module.exports = userValidator;