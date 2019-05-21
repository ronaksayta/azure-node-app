const express = require('express');

const tagController = require('../controllers/tagController');
const azureAuthentication = require('../middleware/azureAuthentication');

const tagRouter = express.Router();

tagRouter.route('/')
    .get(azureAuthentication, tagController.getTagCount);

tagRouter.route('/searchTag')
    .get(azureAuthentication, tagController.getProjectByTagName);

module.exports = tagRouter;