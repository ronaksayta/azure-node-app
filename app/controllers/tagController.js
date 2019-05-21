var Response = require("../util/response");
var tagService = require('../services/tagService');

var tagController = {
    getTagCount: getTagCount,
    getProjectByTagName: getProjectByTagName
};

function getTagCount(req, res) {
    var response = new Response();

    tagService.getTagCount().then(function (tags) {
        response.data.tags = tags;
        response.status.statusCode = '200';
        response.status.message = 'Tag Count retrieved!!';
        res.status(200).json(response);
    }).catch(function (err) {
        response.status.statusCode = '500';
        response.status.message = 'Failed to get tag count: ' + err.message;
        res.status(500).json(response);
    });
}

function getProjectByTagName(req, res) {
    var response = new Response();

    var tagName = req.query.tag;
    var pageNo = req.query.pageNo;
    var limit = req.query.limit;

    tagService.getProjectByTagName(tagName, req.user.mid, pageNo, limit).then(function (projects) {
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

module.exports = tagController;