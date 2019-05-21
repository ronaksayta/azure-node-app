var Promise = require('bluebird');

var imageDao = require('../dao/imageDao');

var imageService = {
    addImage: addImage,
    getImages: getImages,
    deleteImageByUrl: deleteImageByUrl
}

function addImage(image) {
    return new Promise(function (resolve, reject) {
        imageDao.addImage(image).then(function (image) {
            console.log("Image added! {{In Service}}");
            resolve(image);
        }).catch(function (err) {
            console.log("Failed to add image {{In Service}}", err);
            reject(err);
        });
    });
}

function getImages() {
    return new Promise(function (resolve, reject) {
        imageDao.getImages().then(function (images) {
            console.log("Images retrieved! {{In Service}}");
            resolve(images);
        }).catch(function (err) {
            console.log("Failed to get images {{In Service}}", err);
            reject(err);
        });
    });
}

function deleteImageByUrl(imageUrl) {
    return new Promise(function (resolve, reject) {
        imageDao.deleteImageByUrl(imageUrl).then(function (deleteResponse) {
            console.log("Image entry deleted! {{In Service}}");
            resolve(deleteResponse);
        }).catch(function (err) {
            console.log("Failed to delete image entry {{In Service}}", err);
            reject(err);
        });
    })
}

module.exports = imageService;