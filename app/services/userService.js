var Promise = require('bluebird');

var userDao = require('../dao/userDao');


var userService = {
    addUser: addUser,
    getUserByMid: getUserByMid
}

function addUser(user) {
    return new Promise(function (resolve, reject) {
        userDao.addUser(user).then(function (user) {
            console.log("User added! {{In Service}}");
            resolve(user);
        }).catch(function (err) {
            console.log("Failed to add user {{In Service}}", err);
            reject(err);
        });
    });
}

function getUserByMid(userMid) {
    return new Promise(function (resolve, reject) {
        userDao.getUserByMid(userMid).then(function (user) {
            console.log("User retrieved by MID! {{In Service}}");
            resolve(user);
        }).catch(function (err) {
            console.log("Failed to get user by MID {{In Service}}", err);
            reject(err);
        });
    });
}

module.exports = userService;