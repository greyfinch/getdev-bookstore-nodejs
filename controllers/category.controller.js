const categoryService = require('../services/category.services');

exports.addBookCategory = (req, res) => {
    categoryDetails = req.body;
    categoryService.addBookCategory(categoryDetails).then((returnData) => {
        res.send(returnData);
    }).catch((error) => {
        res.send(error);
    });
}

exports.bookCategories = (req, res) => {
    categoryService.bookCategories().then((returnData) => {
        res.send(returnData);
    }).catch((error) => {
        res.send(error)
    });
}
