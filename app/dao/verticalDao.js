var Promise = require('bluebird');

const { Vertical } = require('../config/sequelize');

var verticalDao = {
    getVerticals: getVerticals,
    addVertical: addVertical,
    getVerticalByName: getVerticalByName
}

function getVerticals() {
    return new Promise((resolve, reject) => {
        Vertical.findAll()
            .then((vertical, err) => {
                if (!err) {
                    console.log("Verticals retrieved{{In DAO}}");
                    resolve(vertical);
                } else {
                    console.log("Failed to get verticals {{In DAO}} ", err);
                    reject(new Error("Failed to get verticals {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get verticals {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get verticals {{In DAO}}"));
            });
    });
}

function addVertical(vertical) {
    return new Promise((resolve, reject) => {

        Vertical.findOrCreate({ where: { name: vertical } })
            .spread((vertical, created) => {
                resolve(vertical);
            }).catch((error) => {
                console.log("Failed to add vertical {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to add vertical {{In DAO}}"));
            } );
    });
}

function getVerticalByName(vertical) {
    return new Promise((resolve, reject) => {
        Vertical.findOne({ where: { name: vertical } })
            .then((vertical, err) => {
                if (!err) {
                    console.log("Vertical retrieved{{In DAO}}");
                    resolve(vertical);
                } else {
                    console.log("Failed to get vertical {{In DAO}} ", err);
                    reject(new Error("Failed to get vertical {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get vertical {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get vertical {{In DAO}}"));
            });
    });
}

module.exports = verticalDao;