const express = require('express');

const adminController = require('../controllers/adminController'); 
const azureAuthentication = require('../middleware/azureAuthentication');
const adminAuthorization = require('../middleware/adminAuthorization');

const adminRouter = express.Router();

adminRouter.route('/')
    .get(azureAuthentication, adminAuthorization, adminController.getSumbittedStories)
    .post(azureAuthentication, adminAuthorization, adminController.addProject);

adminRouter.route('/:projectId')
    .get(azureAuthentication, adminAuthorization, adminController.getSumbittedCaseletById)
    .put(azureAuthentication, adminAuthorization, adminController.sendFeedback);

module.exports = adminRouter;