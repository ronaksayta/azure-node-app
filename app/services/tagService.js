var Promise = require('bluebird');

var caseletDao = require('../dao/caseletDao');
var tagDao = require('../dao/tagDao');

var tagService = {
    getTagCount: getTagCount,
    getProjectByTagName: getProjectByTagName
}

function getTagCount() {
    return new Promise((resolve, reject) => {
        tagDao.getTagCount().then(function (tags) {
            console.log("Tag Count retrieved! {{In Service}}");
            resolve(tags);
        }).catch(function (err) {
            console.log("Failed to get tag count {{In Service}}", err);
            reject(err);
        });
    });
}

function getProjectByTagName(tag, userMid, pageNo, limit) {
    return new Promise((resolve, reject) => {
        caseletDao.getProjectByTagName(tag)
            .then((project) => {
                const id = project.map(res => parseInt(res.dataValues.id));
                console.log(id);

                caseletDao.getResults(id, userMid, pageNo, limit)
                    .then((result) => {
                        console.log("Projects retrieved! {{In Service}}");
                        resolve(result);
                    })
                    .catch(function (err) {
                        console.log("Failed to get projects {{In Service}}", err);
                        reject(err);
                    });
            })
            .catch(function (err) {
                console.log("Failed to get projects {{In Service}}", err);
                reject(err);
            });
    })
}

module.exports = tagService;