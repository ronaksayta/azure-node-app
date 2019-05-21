const express = require('express');

const storyController = require('../controllers/storyController');
const azureAuthentication = require('../middleware/azureAuthentication');

const storyRouter = express.Router();

storyRouter.route('/')
    .get(azureAuthentication, storyController.getProjects)
    .post(azureAuthentication, storyController.addPendingStory);

storyRouter.route('/azureAuthentication')
    .get(azureAuthentication, storyController.test);

storyRouter.route('/like')
    .get(azureAuthentication, storyController.getMostLikedProjects);

storyRouter.route('/share')
    .get(azureAuthentication, storyController.getMostSharedProjects);

storyRouter.route('/like/:projectId')
    .put(azureAuthentication, storyController.likeProject);

storyRouter.route('/dislike/:projectId')
    .put(azureAuthentication, storyController.dislikeProject);

storyRouter.route('/share/:projectId')
    .put(azureAuthentication, storyController.shareProject);

storyRouter.route('/download/:projectId')
    .put(azureAuthentication, storyController.downloadProject);

storyRouter.route('/search')
    .get(azureAuthentication, storyController.searchAndFilterProject);

storyRouter.route('/:projectId')
    .get(azureAuthentication, storyController.getProjectById);

storyRouter.route('/save/:userMid')
    .get(azureAuthentication, storyController.getSavedStoriesByUser);

module.exports = storyRouter;