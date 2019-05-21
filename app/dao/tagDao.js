var Promise = require('bluebird');

const {
    Tag,
    Project
} = require('../config/sequelize');

var tagDao = {
    getTagCount: getTagCount,
    addTags: addTags,
    getTags: getTags
}

async function getTagCount() {
    return new Promise(function (resolve, reject) {
        Tag.count({
            attributes: ['name'],
            include: [Project],
            group: ['name']
        })
            .then((tags, err) => {
                if (!err) {
                    console.log("Tag count retrieved{{In DAO}}");
                    resolve(tags);
                } else {
                    console.log("Failed to get tag count {{In DAO}} ", err);
                    reject(new Error("Failed to get tag count {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get tag count {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get tag count {{In DAO}}"));
            });
    });
}

function addTags(tags) {
    return new Promise(function (resolve, reject) {
        resolve(tags.map(tag => Tag.findOrCreate({ where: { name: tag }, defaults: { name: tag } })
            .spread(async (tags, created) => tags)))
            .catch((error) => {
                console.log("Failed to add tag {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to add tag {{In DAO}}"));
            });
    })
}

function getTags() {
    return new Promise(function (resolve, reject) {
        Tag.findAll()
            .then((tags, err) => {
                if (!err) {
                    console.log("Tags retrieved{{In DAO}}");
                    resolve(tags);
                } else {
                    console.log("Failed to get tags {{In DAO}} ", err);
                    reject(new Error("Failed to get tags {{In DAO}}"));
                }
            })
            .catch((error) => {
                console.log("Failed to get tags {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get tags {{In DAO}}"));
            });
    });
}

module.exports = tagDao;