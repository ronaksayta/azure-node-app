var Response = require("../util/response");
var filterService = require('../services/filterService');

var filterController = {
    getFilters: getFilters
};

function getFilters(req, res) {
    var response = new Response();

    filterService.getFilters().then(function (filters) {
        response.data.filters = filters;
        response.status.statusCode = '200';
        response.status.message = 'Filters retrieved!!';
        res.status(200).json(response);
    }).catch(function (err) {
        response.status.statusCode = '500';
        response.status.message = 'Failed to get filters: ' + err.message;
        res.status(500).json(response);
    });
}

module.exports = filterController;