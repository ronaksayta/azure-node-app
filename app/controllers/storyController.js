var Response = require("../util/response");
var storyService = require('../services/storyService');

var storyController = {
    getProjects: getProjects,
    getProjectById: getProjectById,
    likeProject: likeProject,
    dislikeProject: dislikeProject,
    shareProject: shareProject,
    getMostLikedProjects: getMostLikedProjects,
    getMostSharedProjects: getMostSharedProjects,
    addPendingStory: addPendingStory,
    getSavedStoriesByUser: getSavedStoriesByUser,
    searchAndFilterProject: searchAndFilterProject,
    test: test
};


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
    
    storyService.searchAndFilterProject(searchData, filterData, pageNo, limit, req.user.mid).then((searchResults) => {
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

function getProjects(req, res) {
    var response = new Response();

    var pageNo = req.query.pageNo;
    var limit = req.query.limit;

    storyService.getProjects(req.user.mid, pageNo, limit).then(function (projects) {
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

function addPendingStory(req, res) {
    console.log('Reached');
    var response = new Response();

    var body = req.body;

    storyService.addPendingStory(body, req.user).then(function (projectAdded) {
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

    storyService.getSavedStoriesByUser(userMid).then(function (project) {
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

    storyService.getProjectById(projectId).then(function (project) {
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

    storyService.likeProject(projectId, req.user).then(function (project) {
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

    storyService.dislikeProject(projectId, req.user).then(function (project) {
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

    storyService.shareProject(projectId, req.user, body).then(function (project) {
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

    storyService.getMostLikedProjects().then(function (projects) {
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

    storyService.getMostSharedProjects().then(function (projects) {
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

module.exports = storyController;