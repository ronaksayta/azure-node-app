var Promise = require('bluebird');

const { Tool } = require('../config/sequelize');

var toolDao = {
    getTools: getTools,
    addTools: addTools
}

function getTools() {
    return new Promise((resolve, reject) => {
        Tool.findAll()
            .then((tools, err) => {
                if (!err) {
                    console.log("Tools retrieved{{In DAO}}");
                    resolve(tools);
                } else {
                    console.log("Failed to get tools {{In DAO}} ", err);
                    reject(new Error("Failed to get tools {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get tools {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get tools {{In DAO}}"));
            });
    });
}

function addTools(tools) {
    return new Promise((resolve, reject) => {
        resolve(tools.map(tool => Tool.findOrCreate({ where: { name: tool }, defaults: { name: tool } })
            .spread(async (tools, created) => tools)))
            .catch((error) => {
                console.log("Failed to add tools {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to add tools {{In DAO}}"));
            });
    })
}

module.exports = toolDao;