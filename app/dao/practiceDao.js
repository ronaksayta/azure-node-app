var Promise = require('bluebird');

const { Practice } = require('../config/sequelize');

var practiceDao = {
    getPractices: getPractices,
    addPractice: addPractice,
    getPracticeByName: getPracticeByName
}

function getPractices() {
    return new Promise((resolve, reject) => {
        Practice.findAll()
            .then((practices, err) => {
                if (!err) {
                    console.log("Practices retrieved{{In DAO}}");
                    resolve(practices);
                } else {
                    console.log("Failed to get practices {{In DAO}} ", err);
                    reject(new Error("Failed to get practices {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get practices {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get practices {{In DAO}}"));
            });
    });
}

function addPractice(practice) {
    return new Promise((resolve, reject) => {

        Practice.findOrCreate({ where: { name: practice } })
            .spread((practice, created) => {
                resolve(practice);
            }).catch((error) => {
                console.log("Failed to add practice {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to add practice {{In DAO}}"));
            });
    });
}

function getPracticeByName(practice) {
    return new Promise((resolve, reject) => {
        Practice.findOne({ where: { name: practice } })
            .then((practice, err) => {
                if (!err) {
                    console.log("Practice retrieved{{In DAO}}");
                    resolve(practice);
                } else {
                    console.log("Failed to get practice by Name {{In DAO}} ", err);
                    reject(new Error("Failed to get practice by Name {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get practice by Name {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get practice by Name {{In DAO}}"));
            });
    });
}

module.exports = practiceDao;