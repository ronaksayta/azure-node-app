var Promise = require('bluebird');

const { Technology } = require('../config/sequelize');

var technologyDao = {
    getTechnologies: getTechnologies,
    addTechnologiess: addTechnologiess
}

function getTechnologies() {
    return new Promise((resolve, reject) => {
        Technology.findAll()
            .then((technologies, err) => {
                if (!err) {
                    console.log("Technologies retrieved{{In DAO}}");
                    resolve(technologies);
                } else {
                    console.log("Failed to get technologies {{In DAO}} ", err);
                    reject(new Error("Failed to get technologies {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get technologies {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get technologies {{In DAO}}"));
            });
    });
}

function addTechnologiess(technologies) {
    return new Promise((resolve, reject) => {
        resolve(technologies.map(technology => Technology.findOrCreate({ where: { name: technology }, defaults: { name: technology } })
            .spread(async (technologies, created) => technologies)))
            .catch((error) => {
                console.log("Failed to add technology {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to add technology {{In DAO}}"));
            });
    })
}

module.exports = technologyDao;