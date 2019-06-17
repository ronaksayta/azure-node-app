const express = require('express');

const caseletController = require('../controllers/caseletController');
const azureAuthentication = require('../middleware/azureAuthentication');

const caseletRouter = express.Router();

caseletRouter.route('/')
    .get(azureAuthentication, caseletController.getProjects)
    .post(azureAuthentication, caseletController.addPendingCaselet);

caseletRouter.route('/azureAuthentication')
    .get(azureAuthentication, caseletController.test);

caseletRouter.route('/like')
    .get(azureAuthentication, caseletController.getMostLikedProjects);

caseletRouter.route('/share')
    .get(azureAuthentication, caseletController.getMostSharedProjects);

caseletRouter.route('/like/:projectId')
    .put(azureAuthentication, caseletController.likeProject);

caseletRouter.route('/dislike/:projectId')
    .put(azureAuthentication, caseletController.dislikeProject);

caseletRouter.route('/share/:projectId')
    .put(azureAuthentication, caseletController.shareProject);

caseletRouter.route('/download/:projectId')
    .put(azureAuthentication, caseletController.downloadProject);

caseletRouter.route('/search')
    .get(azureAuthentication, caseletController.searchAndFilterProject);


caseletRouter.route('/ronak')
    .get(azureAuthentication, caseletController.getProjectByPagination);

caseletRouter.route('/:projectId')
    .get(azureAuthentication, caseletController.getProjectById);

caseletRouter.route('/save/:userMid')
    .get(azureAuthentication, caseletController.getSavedStoriesByUser);

module.exports = caseletRouter;