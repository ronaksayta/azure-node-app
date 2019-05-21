var Promise = require('bluebird');

const { PendingStory, User } = require('../config/sequelize');

var projectDetailDao = {
    addPendingStory: addPendingStory,
    updatePendingStory: updatePendingStory,
    deletePendingStory: deletePendingStory,
    getSumbittedStories: getSumbittedStories,
    getSavedStoriesByUser: getSavedStoriesByUser,
    getSumbittedStoryById: getSumbittedStoryById,
    sendFeedback: sendFeedback
}

function getSumbittedStories() {
    return new Promise(function (resolve, reject) {

        PendingStory.findAll({
            where: { submit: true },
            include: [
                {
                    model: User,
                    attributes: { include: ['mid', 'name'] }
                }
            ],
            attributes: ['id', 'title'],
        })
            .then(function (pendingStory, err) {
                if (!err) {
                    console.info(pendingStory);
                    console.log("Sumbitted Projects retrieved{{In DAO}}");
                    resolve(pendingStory);
                } else {
                    console.log("Failed to get submitted projects {{In DAO}} ", err);
                    reject(new Error("Failed to get submitted projects {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get submitted projects {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get submitted projects {{In DAO}}"));
            });
    });
}

function getSavedStoriesByUser(userMid) {
    return new Promise(function (resolve, reject) {
        PendingStory.findOne({
            where: { userMid: userMid },
            include: [
                {
                    model: User,
                    attributes: { include: ['mid', 'name'] }
                }
            ]
        })
            .then(function (pendingStory, err) {
                if (!err) {
                    console.log("Saved Projects retrieved by User {{In DAO}}");
                    resolve(pendingStory);
                } else {
                    console.log("Failed to get saved projects by user {{In DAO}} ", err);
                    reject(new Error("Failed to get saved projects by user {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get saved projects by user {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get saved projects by user {{In DAO}}"));
            });
    });
}

function getSumbittedStoryById(storyId) {
    return new Promise(function (resolve, reject) {
        PendingStory.findOne({
            where: { id: storyId, submit: true },
            include: [
                {
                    model: User,
                    attributes: { include: ['mid', 'name'] }
                }
            ]
        })
            .then(function (pendingStory, err) {
                if (!err) {
                    console.log("Saved Projects retrieved by Id {{In DAO}}");
                    resolve(pendingStory);
                } else {
                    console.log("Failed to get saved projects by Id {{In DAO}} ", err);
                    reject(new Error("Failed to get saved projects by Id {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get saved projects by Id {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get saved projects by Id {{In DAO}}"));
            });
    });
}

function addPendingStory(pendingStory) {
    return new Promise(function (resolve, reject) {
        PendingStory.create(pendingStory)
            .then(async (story) => PendingStory.findByPk(story.id,
                {
                    include: [
                        {
                            model: User,
                            attributes: { include: ['mid', 'name'] }
                        }
                    ]
                }
            ))
            .then((story, err) => {
                if (!err) {
                    console.log("New pending story added");
                    resolve(story);
                } else {
                    console.log("Failed to add pending story {{In DAO}} ", err);
                    reject(new Error("Failed to add pending story {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to add pending story {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to add pending story {{In DAO}}"));
            });
    })
}

function updatePendingStory(pendingStory, userMid) {
    return new Promise(function (resolve, reject) {
        PendingStory.update(pendingStory, { where: { userMid: userMid } })
            .then(async () => PendingStory.findOne({ where: { title: pendingStory.title } },
                {
                    include: [
                        {
                            model: User,
                            attributes: { include: ['mid', 'name'] }
                        }
                    ]
                }
            ))
            .then((pendingStory, err) => {
                if (!err) {
                    console.log("Pending Story updated {{In DAO}}");
                    resolve(pendingStory);
                } else {
                    console.log("Failed to update pending story{{In DAO}} ", err);
                    reject(new Error("Failed to update pending story{{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to update pending story{{In DAO}}")
                console.log('Error', error);
                reject(new Error("Failed to update pending story{{In DAO}}"));
            });
    });
}

function deletePendingStory(userMid) {
    return new Promise(function (resolve, reject) {
        PendingStory.destroy({ where: { userMid: userMid } })
            .then(function (deleteResponse, err) {
                if (!err) {
                    console.log("Pending story deleted {{In DAO}}");
                    resolve(deleteResponse);
                } else {
                    console.log("Failed to delete  pending story {{In DAO}} ", err);
                    reject(new Error("Failed to delete  pending story {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to delete  pending story {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to delete  pending story {{In DAO}}"));
            });
    });
}

function sendFeedback(pendingStoryId, message) {
    return new Promise(function (resolve, reject) {
        PendingStory.update({ adminComment: message, submit: false }, { where: { id: pendingStoryId } })
            .then(async () => PendingStory.findOne({ where: { id: pendingStoryId } },
                {
                    include: [
                        {
                            model: User,
                            attributes: { include: ['mid', 'name'] }
                        }
                    ]
                }
            ))
            .then((pendingStory, err) => {
                if (!err) {
                    console.log("Pending Story feedback sent {{In DAO}}");
                    resolve(pendingStory);
                } else {
                    console.log("Failed to send pending story feedback {{In DAO}} ", err);
                    reject(new Error("Failed to send pending story feedback {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to send pending story feedback {{In DAO}}")
                console.log('Error', error);
                reject(new Error("Failed to send pending story feedback {{In DAO}}"));
            });
    })
}

module.exports = projectDetailDao;