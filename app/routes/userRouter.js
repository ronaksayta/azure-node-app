const express = require('express');
const userController = require('../controllers/userController');
const azureAuthentication = require('../middleware/azureAuthentication');

const userRouter = express.Router();

userRouter.route('/')
    .get(azureAuthentication, userController.addUser);

module.exports = userRouter;