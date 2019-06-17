var Promise = require('bluebird');

var subVerticalDao = require('../dao/subVerticalDao');


var subVerticalService = {
    addSubVertical: addSubVertical,
    getSubVerticals: getSubVerticals,
    getSubVerticalByName: getSubVerticalByName
}

function addSubVertical(subVertical) {
    return new Promise((resolve, reject) => {
        subVerticalDao.addSubVertical(subVertical).then(function (subVertical) {
            console.log("SubVertical added! {{In Service}}");
            resolve(subVertical);
        }).catch(function (err) {
            console.log("Failed to add subVertical {{In Service}}", err);
            reject(err);
        });
    });
}

function getSubVerticals() {
    return new Promise((resolve, reject) => {
        subVerticalDao.getSubVerticals().then(function (subVerticals) {
            console.log("SubVerticals retrieved! {{In Service}}");
            resolve(subVerticals);
        }).catch(function (err) {
            console.log("Failed to get subVerticals {{In Service}}", err);
            reject(err);
        });
    });
}

function getSubVerticalByName(subVertical) {
    return new Promise((resolve, reject) => {
        subVerticalDao.getSubVerticalByName(subVertical).then(function (subVertical) {
            console.log("SubVertical retrieved by name! {{In Service}}");
            resolve(subVertical);
        }).catch(function (err) {
            console.log("Failed to get subVertical by name {{In Service}}", err);
            reject(err);
        });
    });
}

module.exports = subVerticalService;