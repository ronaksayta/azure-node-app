var Promise = require('bluebird');

var verticalDao = require('../dao/verticalDao');


var verticalService = {
    addVertical: addVertical,
    getVerticals: getVerticals,
    getVerticalByName: getVerticalByName
}

function addVertical(vertical) {
    return new Promise((resolve, reject) => {
        verticalDao.addVertical(vertical).then(function (vertical) {
            console.log("Vertical added! {{In Service}}");
            resolve(vertical);
        }).catch(function (err) {
            console.log("Failed to add vertical {{In Service}}", err);
            reject(err);
        });
    });
}

function getVerticals() {
    return new Promise((resolve, reject) => {
        verticalDao.getVerticals().then(function (verticals) {
            console.log("Verticals retrieved! {{In Service}}");
            resolve(verticals);
        }).catch(function (err) {
            console.log("Failed to get verticals {{In Service}}", err);
            reject(err);
        });
    });
}

function getVerticalByName(vertical) {
    return new Promise((resolve, reject) => {
        verticalDao.getVerticalByName(vertical).then(function (vertical) {
            console.log("Vertical retrieved by name! {{In Service}}");
            resolve(vertical);
        }).catch(function (err) {
            console.log("Failed to get vertical by name{{In Service}}", err);
            reject(err);
        });
    });
}

module.exports = verticalService;