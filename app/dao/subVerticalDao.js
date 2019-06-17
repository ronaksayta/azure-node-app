var Promise = require('bluebird');

const { SubVertical } = require('../config/sequelize');

var subVerticalDao = {
    getSubVerticals: getSubVerticals,
    addSubVertical: addSubVertical,
    getSubVerticalByName: getSubVerticalByName
}

function getSubVerticals() {
    return new Promise((resolve, reject) => {
        SubVertical.findAll()
            .then((subVerticals, err) => {
                if (!err) {
                    console.log("SubVertical retrieved{{In DAO}}");
                    resolve(subVerticals);
                } else {
                    console.log("Failed to get subVerticals {{In DAO}} ", err);
                    reject(new Error("Failed to get subVerticals {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get subVerticals {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get subVerticals {{In DAO}}"));
            });
    });
}

function addSubVertical(subVertical) {
    return new Promise((resolve, reject) => {
        SubVertical.findOrCreate({ where: { name: subVertical } })
            .spread((subVertical, created) => {
                resolve(subVertical);
            }).catch((error) => {
                console.log("Failed to add subVertical {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to add subVertical {{In DAO}}"));
            });
    });
}

function getSubVerticalByName(subVertical) {
    return new Promise((resolve, reject) => {
        SubVertical.findOne({ where: { name: subVertical } })
            .then((subVertical, err) => {
                if (!err) {
                    console.log("SubVertical retrieved{{In DAO}}");
                    resolve(subVertical);
                } else {
                    console.log("Failed to get subVertical by Name {{In DAO}} ", err);
                    reject(new Error("Failed to get subVertical by Name {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get subVertical by Name {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get subVertical by Name {{In DAO}}"));
            });
    });
}

module.exports = subVerticalDao;