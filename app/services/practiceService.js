var Promise = require('bluebird');

var practiceDao = require('../dao/practiceDao');

var practiceService = {
    addPractice: addPractice,
    getPractices: getPractices,
    getPracticeByName: getPracticeByName
}

function addPractice(practice) {
    return new Promise((resolve, reject) => {
        practiceDao.addPractice(practice).then(function (practice) {
            console.log("Practice added! {{In Service}}");
            resolve(practice);
        }).catch(function (err) {
            console.log("Failed to add practice {{In Service}}", err);
            reject(err);
        });
    });
}

function getPractices() {
    return new Promise((resolve, reject) => {
        practiceDao.getPractices().then(function (practices) {
            console.log("Practices retrieved! {{In Service}}");
            resolve(practices);
        }).catch(function (err) {
            console.log("Failed to get practices {{In Service}}", err);
            reject(err);
        });
    });
}

function getPracticeByName(practice) {
    return new Promise((resolve, reject) => {
        practiceDao.getPracticeByName(practice).then(function (practice) {
            console.log("Practice retrieved by name! {{In Service}}");
            resolve(practice);
        }).catch(function (err) {
            console.log("Failed to get practice by name{{In Service}}", err);
            reject(err);
        });
    });
}

module.exports = practiceService;