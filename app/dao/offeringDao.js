var Promise = require('bluebird');

const { Offering } = require('../config/sequelize');

var offeringDao = {
    getOfferings: getOfferings,
    addOffering: addOffering,
    getOfferingByName: getOfferingByName
}

function getOfferings() {
    return new Promise(function (resolve, reject) {
        Offering.findAll()
            .then((offerings, err) => {
                if (!err) {
                    console.log("Offerings retrieved{{In DAO}}");
                    resolve(offerings);
                } else {
                    console.log("Failed to get offerings {{In DAO}} ", err);
                    reject(new Error("Failed to get offerings {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get offerings {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get offerings {{In DAO}}"));
            });
    });
}

function addOffering(offering) {
    return new Promise(function (resolve, reject) {

        Offering.findOrCreate({ where: { name: offering } })
            .spread((offering, created) => {
                resolve(offering);
            }).catch((error) => {
                console.log("Failed to add offering {{In DAO}}")
                console.log('Error', error);
                reject(new Error("Failed to add offering {{In DAO}}"));
            });
    });
}

function getOfferingByName(offering) {
    return new Promise(function (resolve, reject) {
        Offering.findOne({ where: { name: offering } })
            .then((offering, err) => {
                if (!err) {
                    console.log("Offering retrieved{{In DAO}}");
                    resolve(offering);
                } else {
                    console.log("Failed to get offering by Name {{In DAO}} ", err);
                    reject(new Error("Failed to get offering by Name {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get offering by Name {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get offering by Name {{In DAO}}"));
            });
    });
}

module.exports = offeringDao;