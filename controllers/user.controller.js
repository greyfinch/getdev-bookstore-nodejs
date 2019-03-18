const userService = require('../services/user.services')

exports.userLogin = (req, res) => {
    credentials = req;
    userService.userLogin(credentials).then((returnedData) => {
        res.send(returnedData);
    }).catch((error) => {
        res.send(error);
    })
}

exports.createUser = (req, res) => {
    userDetails = req.body;
    userService.createUser(userDetails).then((returnedData) => {
        res.send(returnedData);
    }).catch((error) => {
        res.send(error);
    })
}

exports.getAllUsers = (req, res) => {
    userService.getAllUsers().then((returnedData) => {
        res.send(returnedData);
    }).catch((error) => {
        res.send(error);
    })
}

exports.userLogout = (req, res) => {
    req.session.destroy( () =>{
        res.send(JSON.stringify({"OptStatus": "User logged out successfully"}));
    })
}
