const userService = require('../services/user.services')
const userValidator = require('../utilities/user.validate');

exports.userLogin = (req, res) => {
    //validate user input
    userValidator.userLoginValidator(req.body).then((validData) => {
        if(validData){
            userService.userLogin(req).then((returnedData) => {
                res.send(returnedData);
            }).catch((error) => {
                res.send(error);
            })
        }
    }).catch((error) => {
        res.send(error);
    });
}

exports.createUser = (req, res) => {
    //check if user is logged in
    userService.getUserSession(req).then((data) => {
        if(data) {
            //validate user input
            userValidator.newUserValidator(req.body).then((validData) => {
                if(validData){                    
                    userService.createUser(req).then((returnedData) => {
                        res.send(returnedData);
                    }).catch((error) => {
                        res.send(error);
                    });
                }
            }).catch((error) => {
                res.send(error);
            });
        }
    }).catch((error) => {
        res.send(error);
    });
}

exports.getAllUsers = (req, res) => {
    //check if user is logged in
    userService.getUserSession(req).then((data) => {
        if(data) {
            userService.getAllUsers().then((returnedData) => {
                res.send(returnedData);
            }).catch((error) => {
                res.send(error);
            })
        }
    }).catch((error) => {
        res.send(error);
    });
}

exports.userLogout = (req, res) => {
    userService.getUserSession(req).then((data) => {
        if(data) {
            req.session.destroy( () => {
                res.send(JSON.stringify({"OptStatus": "User logged out successfully"}));
            })
        }
    }).catch((error) => {
        res.send(error);
    });
}
