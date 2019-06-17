var Promise = require('bluebird');

var subPracticeDao = require('../dao/subPracticeDao');

var subPracticeService = {
    addSubPractice: addSubPractice,
    getSubPractices: getSubPractices,
    getSubPracticeByName: getSubPracticeByName
}

function addSubPractice(subPractice, practiceId) {
    return new Promise((resolve, reject) => {
        subPracticeDao.addSubPractice(subPractice, practiceId).then(function (subPractice) {
            console.log("SubPractice added! {{In Service}}");
            resolve(subPractice);
        }).catch(function (err) {
            console.log("Failed to add subPractice {{In Service}}", err);
            reject(err);
        });
    });
}

function getSubPractices() {
    return new Promise((resolve, reject) => {
        subPracticeDao.getSubPractices().then(function (subPractices) {
            console.log("SubPractices retrieved! {{In Service}}");
            resolve(subPractices);
        }).catch(function (err) {
            console.log("Failed to get subPractices {{In Service}}", err);
            reject(err);
        });
    });
}

function getSubPracticeByName(subPractice, practiceId) {
    return new Promise((resolve, reject) => {
        subPracticeDao.getSubPracticeByName(subPractice, practiceId).then(function (subPractice) {
            console.log("SubPractice retrieved by name! {{In Service}}");
            resolve(subPractice);
        }).catch(function (err) {
            console.log("Failed to get subPractice by name{{In Service}}", err);
            reject(err);
        });
    });
}

module.exports = subPracticeService;