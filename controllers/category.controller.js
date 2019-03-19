/*****
 * Define Category controller
 * *****/

 const categoryService = require('../services/category.services');
const userService = require('../services/user.services');
const categoryValidate = require('../utilities/category.validate');

exports.addBookCategory = (req, res) => {
    //check if user is logged in
    userService.getUserSession(req).then((data) => {
        if(data) {
            //validate user inputs
            categoryValidate.newCategoryValidator(req.body).then((validData) => {
                if(validData){
                    categoryService.addBookCategory(req).then((returnData) => {
                        res.send(returnData);
                    }).catch((error) => {
                        res.send(error);
                    });
                }
            }).catch((error) => {
                res.send(error);
            });
        }
    }).catch((error) => {
        res.send(error)
    });
}

exports.bookCategories = (req, res) => {
    //check if user is logged in
    userService.getUserSession(req).then((data) => {
        if(data) {
            categoryService.bookCategories().then((returnData) => {
                res.send(returnData);
            }).catch((error) => {
                res.send(error)
            });
        }
    }).catch((error) => {
        res.send(error)
    });
}
