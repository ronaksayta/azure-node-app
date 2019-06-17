var Promise = require('bluebird');

var caseletDao = require('../dao/caseletDao');
var userDao = require('../dao/userDao');
var accountDao = require('../dao/accountDao');
var customerDao = require('../dao/customerDao');
var offeringDao = require('../dao/offeringDao');
var verticalDao = require('../dao/verticalDao');
var subVerticalDao = require('../dao/subVerticalDao');
var subPracticeDao = require('../dao/subPracticeDao');
var practiceDao = require('../dao/practiceDao');
var contractDao = require('../dao/contractDao');
var tagDao = require('../dao/tagDao');
var toolDao = require('../dao/toolDao');
var technologyDao = require('../dao/technologyDao');
var pendingCaseletDao = require('../dao/pendingCaseletDao');

var adminService = {
    addProject: addProject,
    deleteProjectById: deleteProjectById,
    getSumbittedStories: getSumbittedStories,
    getSumbittedCaseletById: getSumbittedCaseletById,
    sendFeedback: sendFeedback
}

function addProject(body, adminMid) {
    return new Promise((resolve, reject) => {

        pendingCaseletDao.getSavedStoriesByUser(body.user.mid)
            .then((caselet, err) => {
                if (caselet) {

                    const tags = tagDao.addTags(body.tags);
                    const technologies = technologyDao.addTechnologiess(body.technologies);
                    const tools = toolDao.addTools(body.tools);

                    const user = userDao.addUser(body.user);
                    const customer = customerDao.addCustomer(body.customer);

                    const account = accountDao.getAccountByName(body.account);
                    const offering = offeringDao.getOfferingByName(body.offering);
                    const vertical = verticalDao.getVerticalByName(body.vertical);
                    const subVertical = subVerticalDao.getSubVerticalByName(body.subVertical);
                    const practice = practiceDao.getPracticeByName(body.practice);
                    const contract = contractDao.getContractByName(body.contract);

                    Promise.all([tags, technologies, tools, user, account, customer, offering, vertical, subVertical, practice, contract])
                        .then((values) => {

                            subPracticeDao.getSubPracticeByName(body.subPractice, values[9].id)
                                .then((subPractice) => {

                                    console.log(values);

                                    let b = body;
                                    b.userMid = values[3].dataValues.mid;
                                    b.accountId = values[4].dataValues.id;
                                    b.customerId = values[5].dataValues.id;
                                    b.offeringId = values[6].dataValues.id;
                                    b.verticalId = values[7].dataValues.id;
                                    b.subVerticalId = values[8].dataValues.id;
                                    b.subPracticeId = subPractice.dataValues.id;
                                    b.practiceId = values[9].dataValues.id;
                                    b.contractId = values[10].dataValues.id;
                                    b.approvedBy = adminMid;
                                    b.expertsOfTopic = body.expertsOfTopic.join();
                                    b.submittedTime = caselet.updatedAt;

                                    caseletDao.addProject(b, values[0], values[1], values[2])
                                        .then(function (projectAdded) {
                                            console.log("Project approved! {{In Service}}");
                                            pendingCaseletDao.deletePendingCaselet(b.userMid);
                                            resolve(projectAdded);
                                        }).catch(function (err) {
                                            console.log("Failed to approve project {{In Service}}", err);
                                            reject(err);
                                        });
                                }).catch(function (err) {
                                    console.log("Failed to approve project {{In Service}}", err);
                                    reject(err);
                                });
                        });
                }
                else {
                    console.log("Project does not exist in Pending Project table. Failed to approve project {{In Service}}", err);
                    reject(err);
                }
            }).catch(function (err) {
                console.log("Failed to approve project {{In Service}}", err);
                reject(err);
            });
    });
}

function deleteProjectById(projectId) {
    return new Promise((resolve, reject) => {
        caseletDao.deleteProjectById(projectId).then(function (deleteResponse) {
            console.log("Project deleted! {{In Service}}");
            resolve(deleteResponse);
        }).catch(function (err) {
            console.log("Failed to delete project {{In Service}}", err);
            reject(err);
        });
    });
}

function getSumbittedStories() {
    return new Promise((resolve, reject) => {
        pendingCaseletDao.getSumbittedStories()
            .then(function (project) {
                console.log("Sumbitted Projects retrieved! {{In Service}}");
                resolve(project);
            }).catch(function (err) {
                console.log("Failed to get submitted projects {{In Service}}", err);
                reject(err);
            });
    });
}

function getSumbittedCaseletById(caseletId) {
    return new Promise((resolve, reject) => {
        pendingCaseletDao.getSumbittedCaseletById(caseletId)
            .then(function (project) {
                console.log("Sumbitted Project retrieved by ID! {{In Service}}");
                resolve(project);
            }).catch(function (err) {
                console.log("Failed to get submitted project by ID {{In Service}}", err);
                reject(err);
            });
    });
}

function sendFeedback(pendingCaseletId, message) {
    return new Promise((resolve, reject) => {
        pendingCaseletDao.sendFeedback(pendingCaseletId, message)
            .then(function (project) {
                console.log("Pending Projects feedback sent! {{In Service}}");
                resolve(project);
            }).catch(function (err) {
                console.log("Failed to send pending projects feedback {{In Service}}", err);
                reject(err);
            });
    })
}

module.exports = adminService;