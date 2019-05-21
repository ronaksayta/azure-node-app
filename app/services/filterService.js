var Promise = require('bluebird');

var accountDao = require('../dao/accountDao');
var subVerticalDao = require('../dao/subVerticalDao');
var subPracticeDao = require('../dao/subPracticeDao');
var offeringDao = require('../dao/offeringDao');
var technologyDao = require('../dao/technologyDao');
var toolDao = require('../dao/toolDao');
var tagDao = require('../dao/tagDao');
var verticalDao = require('../dao/verticalDao');
var contractDao = require('../dao/contractDao');
var practiceDao = require('../dao/practiceDao');

var filterService = {
    getFilters: getFilters
}

function getFilters() {
    return new Promise(function (resolve, reject) {

        const account = accountDao.getAccounts();
        const subVertical = subVerticalDao.getSubVerticals();
        const offering = offeringDao.getOfferings();
        const subPractice = subPracticeDao.getSubPractices();
        const technology = technologyDao.getTechnologies();
        const tool = toolDao.getTools();
        const tag = tagDao.getTags();
        const vertical = verticalDao.getVerticals();
        const contract = contractDao.getContracts();
        const practice = practiceDao.getPractices();

        Promise.all([account, subVertical, offering, subPractice, technology, tool, tag, vertical, contract, practice])
            .then(function (values) {
                let filters = {};
                filters.contracts = values[8];
                filters.practice = values[9];
                filters.verticals = values[7];
                filters.offerings = values[2];
                filters.subPractices = values[3];
                filters.subVerticals = values[1];
                filters.technologies = values[4];
                filters.tools = values[5];
                filters.tag = values[6];
                filters.accounts = values[0];

                console.log("Filterss retrieved! {{In Service}}");
                resolve(filters);
            })
            .catch(function (err) {
                console.log("Failed to get filters {{In Service}}", err);
                reject(err);
            });
    });
}

module.exports = filterService;