var Response = require("../util/response");

var imageService = require('../services/imageService');

var imageController = {
    saveImage: saveImage,
    deleteImageByUrl: deleteImageByUrl
};

function saveImage(req, res) {
    var response = new Response();

    if (req.imageUrls[0]) {
        imageService.addImage(req.imageUrls[0])
            .then(function (image) {
                response.data.imageName = image.name;
                response.data.imageUrl = image.url;
                response.status.statusCode = '200';
                response.status.message = 'Image saved!!';
                res.status(200).json(response);
            }).catch(function (err) {
                response.status.statusCode = '500';
                response.status.message = 'Failed to save image: ' + err.message;
                res.status(500).json(response);
            });
    }
    else {
        response.status.statusCode = '500';
        response.status.message = 'Failed to save image';
        res.status(500).json(response);
    }
}

function deleteImageByUrl(req, res) {
    var response = new Response();
    var imageUrl = req.body.imageUrl;

    imageService.deleteImageByUrl(imageUrl).then(function (deleteResponse) {
        response.status.statusCode = '200';
        response.status.message = 'Image entry deleted successfully!!';
        res.status(200).json(response);
    }).catch(function (err) {
        response.status.statusCode = '500';
        response.status.message = 'Could not delete image entry: ' + err.message;
        res.status(500).json(response);
    });
}

module.exports = imageController;