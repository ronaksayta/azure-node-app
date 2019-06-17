var Response = require("../util/response");
var caseletService = require('../services/caseletService');

var caseletController = {
    getProjects: getProjects,
    getProjectById: getProjectById,
    likeProject: likeProject,
    dislikeProject: dislikeProject,
    shareProject: shareProject,
    getMostLikedProjects: getMostLikedProjects,
    getMostSharedProjects: getMostSharedProjects,
    addPendingCaselet: addPendingCaselet,
    getSavedStoriesByUser: getSavedStoriesByUser,
    searchAndFilterProject: searchAndFilterProject,
    downloadProject: downloadProject,
    getProjectByPagination: getProjectByPagination,
    test: test
};

function getProjectByPagination(req, res) {
    var pageNo = req.query.pageNo;
    var limit = req.query.limit;
    var response = new Response();
    caseletService.getProjectByPagination(req.user.mid, limit, pageNo).then((projects) => {
        response.data.projects = projects;
        response.status.statusCode = '200';
        response.status.message = 'Project retrieved!!';
        res.status(200).json(response);
    }).catch((error) => {
        response.status.statusCode = '500';
        response.status.message = 'Failed to get project: ' + error.message;
        res.status(500).json(response);
    });
}


function test(req, res) {
    res.status(200).json({
        message: 'Test successful'
    })
}

function searchAndFilterProject(req, res) {
    var response = new Response();

    var searchData = req.query.search;
    var filterData = req.query.filter;
    var pageNo = req.query.pageNo;
    var limit = req.query.limit;
    var technologies = req.query.technologies;
    var tools = req.query.tools;
    
    caseletService.searchAndFilterProject(searchData, filterData, pageNo, limit, req.user.mid, technologies, tools)
        .then((searchResults) => {
        response.data.projects = searchResults;
        response.status.statusCode = '200';
        response.status.message = 'Project retrieved!!';
        res.status(200).json(response);
    }).catch(function (err) {
        response.status.statusCode = '500';
        response.status.message = 'Failed to search project: ' + err.message;
        res.status(500).json(response);
    });
}

function downloadProject(req, res) {
    var response = new Response();

    var projectId = req.params.projectId;

    caseletService.downloadProject(projectId).then(function (project) {
        response.data.project = project;
        response.status.statusCode = '200';
        response.status.message = 'Project downloaded successfully!!';
        res.status(200).json(response);
    }).catch(function (err) {
        response.status.statusCode = '500';
        response.status.message = 'Could not download project: ' + err.message;
        res.status(500).json(response);
    });
}

function getProjects(req, res) {
    var response = new Response();

    var pageNo = req.query.pageNo;
    var limit = req.query.limit;

    caseletService.getProjects(req.user.mid, pageNo, limit).then(function (projects) {
        response.data.projects = projects;
        response.status.statusCode = '500';
        response.status.message = 'Project retrieved!!';
        res.status(200).json(response);
    }).catch(function (err) {
        response.status.statusCode = '500';
        response.status.message = 'Failed to get project: ' + err.message;
        res.status(500).json(response);
    });
}

function addPendingCaselet(req, res) {
    console.log('Reached');
    var response = new Response();

    var body = req.body;

    caseletService.addPendingCaselet(body, req.user).then(function (projectAdded) {
        response.data.project = projectAdded;
        response.status.statusCode = '200';
        response.status.message = 'Project added successfully!!';
        res.status(200).json(response);
    }).catch(function (err) {
        response.status.statusCode = '500';
        response.status.message = 'Could not add project: ' + err.message;
        res.status(500).json(response);
    });
}

function getSavedStoriesByUser(req, res) {
    var response = new Response();
    var userMid = req.params.userMid;

    caseletService.getSavedStoriesByUser(userMid).then(function (project) {
        response.data.project = project;
        response.status.statusCode = '200';
        response.status.message = 'Saved Project retrieved by User successfully!!';
        res.status(200).json(response);
    }).catch(function (err) {
        response.status.statusCode = '500';
        response.status.message = 'Could not get saved project: ' + err.message;
        res.status(500).json(response);
    });
}

function getProjectById(req, res) {
    var response = new Response();
    var projectId = req.params.projectId;

    caseletService.getProjectById(projectId).then(function (project) {
        response.data.project = project;
        response.status.statusCode = '200';
        response.status.message = 'Project retrieved by ID successfully!!';
        res.status(200).json(response);
    }).catch(function (err) {
        response.status.statusCode = '500';
        response.status.message = 'Could not get project: ' + err.message;
        res.status(500).json(response);
    });
}

function likeProject(req, res) {
    var response = new Response();
    var projectId = req.params.projectId;

    caseletService.likeProject(projectId, req.user).then(function (project) {
        response.data.project = project;
        response.status.statusCode = '200';
        response.status.message = 'Project liked successfully!!';
        res.status(200).json(response);
    }).catch(function (err) {
        response.status.statusCode = '500';
        response.status.message = 'Could not like project: ' + err.message;
        res.status(500).json(response);
    });
}

function dislikeProject(req, res) {
    var response = new Response();
    var projectId = req.params.projectId;

    caseletService.dislikeProject(projectId, req.user).then(function (project) {
        response.data.project = project;
        response.status.statusCode = '200';
        response.status.message = 'Project liked successfully!!';
        res.status(200).json(response);
    }).catch(function (err) {
        response.status.statusCode = '500';
        response.status.message = 'Could not like project: ' + err.message;
        res.status(500).json(response);
    });
}

function shareProject(req, res) {
    var response = new Response();

    var projectId = req.params.projectId;
    var body = req.body;

    caseletService.shareProject(projectId, req.user, body).then(function (project) {
        response.data.project = project;
        response.status.statusCode = '200';
        response.status.message = 'Project shared successfully!!';
        res.status(200).json(response);
    }).catch(function (err) {
        response.status.statusCode = '500';
        response.status.message = 'Could not share project: ' + err.message;
        res.status(500).json(response);
    });
}

function getMostLikedProjects(req, res) {
    var response = new Response();

    caseletService.getMostLikedProjects().then(function (projects) {
        response.data.projects = projects;
        response.status.statusCode = '200';
        response.status.message = 'Most Liked projects retrieved!!';
        res.status(200).json(response);
    }).catch(function (err) {
        response.status.statusCode = '500';
        response.status.message = 'Failed to get most liked project: ' + err.message;
        res.status(500).json(response);
    });
}

function getMostSharedProjects(req, res) {
    var response = new Response();

    caseletService.getMostSharedProjects().then(function (projects) {
        response.data.projects = projects;
        response.status.statusCode = '200';
        response.status.message = 'Most shared projects retrieved!!';
        res.status(200).json(response);
    }).catch(function (err) {
        response.status.statusCode = '500';
        response.status.message = 'Failed to get most shared projects: ' + err.message;
        res.status(500).json(response);
    });
}

module.exports = caseletController;