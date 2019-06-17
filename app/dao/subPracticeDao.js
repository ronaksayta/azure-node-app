var Promise = require('bluebird');

const { Practice, SubPractice } = require('../config/sequelize');

var subPracticeDao = {
    getSubPractices: getSubPractices,
    addSubPractice: addSubPractice,
    getSubPracticeByName: getSubPracticeByName
}

function getSubPractices() {
    return new Promise((resolve, reject) => {
        SubPractice.findAll({ include: [Practice] })
            .then((subPractices, err) => {
                if (!err) {
                    console.log("SubPractices retrieved{{In DAO}}");
                    resolve(subPractices);
                } else {
                    console.log("Failed to get subPractices {{In DAO}} ", err);
                    reject(new Error("Failed to get subPractices {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get subPractices {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get subPractices {{In DAO}}"));
            });
    });
}

function addSubPractice(subPractice, practiceId) {
    return new Promise((resolve, reject) => {

        SubPractice.findOrCreate({ where: { name: subPractice, practiceId: practiceId } })
            .spread((subPractice, created) => {
                resolve(subPractice);
            }).catch((error) => {
                console.log("Failed to add subPractice {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to add subPractice {{In DAO}}"));
            });
    });
}

function getSubPracticeByName(subPractice, practiceId) {
    return new Promise((resolve, reject) => {
        SubPractice.findOne({ where: { name: subPractice, practiceId:practiceId }, include: [Practice] })
            .then((subPractice, err) => {
                if (!err) {
                    console.log("SubPractice retrieved{{In DAO}}");
                    resolve(subPractice);
                } else {
                    console.log("Failed to get subPractice by Name {{In DAO}} ", err);
                    reject(new Error("Failed to get subPractice by Name {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get subPractice by Name {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get subPractice by Name {{In DAO}}"));
            });
    });
}

module.exports = subPracticeDao;