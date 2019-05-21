const express = require('express');

var multerImages = require("../middleware/multerMiddleware");
var { storeImageInAzureCloud } = require("../middleware/azureMiddleware");
const azureAuthentication = require('../middleware/azureAuthentication');

const imageController = require('../controllers/imageController');

const imageRouter = express.Router();


const imageUploadAzure = require('../middleware/imageUploadAzure');
// trial of file upload using stream
const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const singleFileUpload = multer({ storage: inMemoryStorage });

imageRouter.route('/stream')
    .post(azureAuthentication, multerImages, storeImageInAzureCloud, imageController.saveImage)
    .delete(imageController.deleteImageByUrl);

imageRouter.route('/')
    .post(azureAuthentication, singleFileUpload.single('image'), imageUploadAzure);

module.exports = imageRouter;