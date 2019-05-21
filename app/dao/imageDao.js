var Promise = require('bluebird');

const { Image } = require('../config/sequelize');

var imageDao = {
    getImages: getImages,
    addImage: addImage,
    deleteImageByUrl: deleteImageByUrl
}

function getImages() {
    return new Promise(function (resolve, reject) {
        Image.findAll()
            .then((images, err) => {
                if (!err) {
                    console.log("Images retrieved{{In DAO}}");
                    resolve(images);
                } else {
                    console.log("Failed to get Images {{In DAO}} ", err);
                    reject(new Error("Failed to get Images {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get Images {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get Images {{In DAO}}"));
            });
    });
}

function addImage(image) {
    return new Promise(function (resolve, reject) {
        console.log(image);
        Image.findOrCreate({ where: { name: image.name, url: image.url } })
            .spread((image, created) => {
                resolve(image);
            }).catch((error) => {
                reject(new Error("Failed to add entry of image in table {{In DAO}}"));
            });
    });
}

function deleteImageByUrl(imageUrl) {
    return new Promise(function (resolve, reject) {
        Image.destroy({
            where: { url: imageUrl }
        })
            .then(function (deleteResponse, err) {
                if (!err) {
                    console.log("Image deleted by id {{In DAO}}");
                    resolve(deleteResponse);
                } else {
                    console.log("Failed to delete image by id {{In DAO}} ", err);
                    reject(new Error("Failed to delete image by id {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to delete image by id {{In DAO}}");
                reject(new Error("Failed to delete image by id {{In DAO}}"));
            });
    });
}

module.exports = imageDao;