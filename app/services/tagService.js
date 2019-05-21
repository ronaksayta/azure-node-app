var Promise = require('bluebird');

var tagDao = require('../dao/tagDao');

var tagService = {
    getTagCount: getTagCount
}

function getTagCount() {
    return new Promise(function (resolve, reject) {
        tagDao.getTagCount().then(function (tags) {
            console.log("Tag Count retrieved! {{In Service}}");
            resolve(tags);
        }).catch(function (err) {
            console.log("Failed to get tag count {{In Service}}", err);
            reject(err);
        });
    });
}

module.exports = tagService;