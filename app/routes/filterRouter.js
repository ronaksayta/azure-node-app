const express = require('express');

const filterController = require('../controllers/filterController');
const azureAuthentication = require('../middleware/azureAuthentication');

const filterRouter = express.Router();

filterRouter.route('/')
    .get(azureAuthentication, filterController.getFilters);

module.exports = filterRouter;