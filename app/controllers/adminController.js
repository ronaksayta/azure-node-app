var Response = require("../util/response");
var adminService = require('../services/adminService');

var adminController = {
    addProject: addProject,
    deleteProjectById: deleteProjectById,
    getSumbittedStories: getSumbittedStories,
    getSumbittedCaseletById: getSumbittedCaseletById,
    sendFeedback: sendFeedback
}

function addProject(req, res) {
    var response = new Response();

    var body = req.body;

    adminService.addProject(body, req.user.mid).then(function (projectAdded) {
        response.data.project = projectAdded;
        response.status.statusCode = '200';
        response.status.message = 'Project approved successfully!!';
        res.status(200).json(response);
    }).catch(function (err) {
        response.status.statusCode = '500';
        response.status.message = 'Could not approve project: ' + err.message;
        err.message
        res.status(500).json(response);
    }); 
}

function deleteProjectById(req, res) {
    var response = new Response();

    var projectId = req.params.projectId;

    adminService.deleteProjectById(projectId).then(function (deleteResponse) {
        response.status.statusCode = '200';
        response.status.message = 'Project deleted successfully!!';
        res.status(200).json(response);
    }).catch(function (err) {
        response.status.statusCode = '500';
        response.status.message = 'Could not delete project: ' + err.message;
        res.status(500).json(response);
    });
}

function getSumbittedStories(req, res) {
    var response = new Response();

    adminService.getSumbittedStories().then(function (projects) {
        response.data.projects = projects;
        response.status.statusCode = '200';
        response.status.message = 'Project retrieved!!';
        res.status(200).json(response);
    }).catch(function (err) {
        response.status.statusCode = '500';
        response.status.message = 'Failed to get project: ' + err.message;
        res.status(500).json(response);
    });
}

function getSumbittedCaseletById(req, res) {
    var response = new Response();

    var projectId = req.params.projectId;

    adminService.getSumbittedCaseletById(projectId)
        .then(function (project) {
            response.data.project = project;
            response.status.statusCode = '200';
            response.status.message = 'Submitted Project retrieved by ID successfully!!';
            res.status(200).json(response);
        }).catch(function (err) {
            response.status.statusCode = '500';
            response.status.message = 'Could not get submitted project: ' + err.message;
            res.status(500).json(response);
        });
}


function sendFeedback(req, res) {
    var response = new Response();

    var pendingCaseletId = req.params.projectId;
    var message = req.body.message;

    adminService.sendFeedback(pendingCaseletId, message)
        .then(function (project) {
            response.data.project = project;
            response.status.statusCode = '200';
            response.status.message = 'Pending Project feedback sent by ID successfully!!';
            res.status(200).json(response);
        }).catch(function (err) {
            response.status.statusCode = '500';
            response.status.message = 'Could not get send feeback for pending project: ' + err.message;
            res.status(500).json(response);
        });
}

module.exports = adminController;