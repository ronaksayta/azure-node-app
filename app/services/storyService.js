var Promise = require('bluebird');
var AzureSearch = require('azure-search');
var config = require('../config/config');
var mailer = require('../util/mailer');

var storyDao = require('../dao/storyDao');
var userDao = require('../dao/userDao');
var pendingStoryDao = require('../dao/pendingStoryDao');

var storyService = {
    getProjects: getProjects,
    getProjectById: getProjectById,
    likeProject: likeProject,
    dislikeProject: dislikeProject,
    shareProject: shareProject,
    getMostLikedProjects: getMostLikedProjects,
    getMostSharedProjects: getMostSharedProjects,
    addPendingStory: addPendingStory,
    downloadProject: downloadProject,
    getSavedStoriesByUser: getSavedStoriesByUser,
    searchAndFilterProject: searchAndFilterProject
}

function searchAndFilterProject(searchValue, filterValue, pageNo, limit, userMid) {
    return new Promise((resolve, reject) => {
        var client = AzureSearch({
            url: config.searchUrl,
            key: config.queryKey
        });
        client.search('project', { search: searchValue, filter: filterValue, top: parseInt(limit), skip: (pageNo - 1)*limit }, function (err, results) {
            if (!err) {

                const ids = results.map(robot => parseInt(robot.id));
                storyDao.getSearchedProjects(ids, userMid, pageNo, limit)
                    .then(function (project) {
                        console.log("Projects retrieved! {{In Service}}");
                        resolve(project);
                    }).catch(function (err) {
                        console.log("Failed to get projects {{In Service}}", err);
                        reject(err);
                    });
            } else {
                console.log("Failed to search projects {{In Service}} ", err);
                reject(new Error("Failed to search projects {{In Service}}"));
            }
        });
    });
}

function downloadProject(projectId) {
    return new Promise(function (resolve, reject) {
        storyDao.downloadProject(projectId)
            .then(function (project) {
                console.log("Project downloaded! {{In Service}}");
                resolve(project);
            }).catch(function (err) {
                console.log("Failed to download project {{In Service}}", err);
                reject(err);
            });
    });
}

function getProjects(userMid, pageNo, limit) {
    return new Promise(function (resolve, reject) {
        storyDao.getProjects(userMid, pageNo, limit)
            .then(function (project) {
                console.log("Projects retrieved! {{In Service}}");
                resolve(project);
            }).catch(function (err) {
                console.log("Failed to get projects {{In Service}}", err);
                reject(err);
            });
    });
}

function addPendingStory(body, user) {
    return new Promise(function (resolve, reject) {

        console.log(user);

        pendingStoryDao.getSavedStoriesByUser(user.mid)
            .then((story) => {
                if (story) {

                    let b = body;
                    console.log('Service', b);
                    b.tags = body.tags.join();
                    b.technologies = body.technologies.join();
                    b.tools = body.tools.join();
                    b.customerName = body.customer.name;
                    b.customerDetails = body.customer.details;
                    console.log(b.customerName);
                    b.expertsOfTopic = body.expertsOfTopic.join();

                    pendingStoryDao.updatePendingStory(b, user.mid)
                        .then((story) => {
                            console.log("Pending Story updated! {{In Service}}");
                            resolve(story);
                        }).catch(function (err) {
                            console.log("Failed to update pending story {{In Service}}", err);
                            reject(err);
                        });
                }
                else {

                    const users = userDao.addUser(user);

                    Promise.all([users])
                        .then((values) => {
                            console.log("values: ", values);

                            let b = body;
                            b.userMid = values[0].mid;
                            b.tags = body.tags.join();
                            b.technologies = body.technologies.join();
                            b.tools = body.tools.join();
                            b.customerName = body.customer.name;
                            b.customerDetails = body.customer.details;
                            b.expertsOfTopic = body.expertsOfTopic.join();

                            console.log(b);

                            pendingStoryDao.addPendingStory(b)
                                .then(function (projectAdded) {
                                    console.log("Pending Story added! {{In Service}}");
                                    resolve(projectAdded);
                                }).catch(function (err) {
                                    console.log("Failed to add pending story {{In Service}}", err);
                                    reject(err);
                                });
                        });
                }
            }).catch(function (err) {
                console.log("Failed to add/update pending story {{In Service}}", err);
                reject(err);
            });
    });
}

function getSavedStoriesByUser(userMid) {
    return new Promise(function (resolve, reject) {
        pendingStoryDao.getSavedStoriesByUser(userMid)
            .then(function (project) {
                console.log("Saved Project retrieved! {{In Service}}");
                resolve(project);
            }).catch(function (err) {
                console.log("Failed to get saved project {{In Service}}", err);
                reject(err);
            });
    });
}

function getProjectById(projectId) {
    return new Promise(function (resolve, reject) {
        storyDao.getProjectById(projectId)
            .then(function (project) {
                console.log("Project retrieved! {{In Service}}");
                resolve(project);
            }).catch(function (err) {
                console.log("Failed to get project {{In Service}}", err);
                reject(err);
            });
    });
}

function likeProject(projectId, user) {
    return new Promise(function (resolve, reject) {

        const projects = storyDao.getProjectByProjectId(projectId);
        const users = userDao.addUser(user);
        const likedProject = storyDao.getLikedProject(projectId, user.mid);

        Promise.all([likedProject, projects, users])
            .then((values) => {
                console.log("Liked Project: ", values[0].likes.length);

                if (values[0].likes.length == 0) {
                    storyDao.likeProject(values[1], values[2]).then(function (project) {
                        console.log("Project liked! {{In Service}}");
                        resolve(project);
                    }).catch(function (err) {
                        console.log("Failed to like project {{In Service}}", err);
                        reject(err);
                    });
                }
            }).catch(function (err) {
                console.log("Failed to like project {{In Service}}", err);
                reject(err);
            });

    });
}

function dislikeProject(projectId, user) {
    return new Promise(function (resolve, reject) {

        const projects = storyDao.getLikedProject(projectId, user.mid);
        const users = userDao.addUser(user);

        Promise.all([projects, users])
            .then((values) => {
                console.log("Liked Project: ", values[0].likes.length);

                if (values[0].likes.length != 0) {
                    storyDao.dislikeProject(values[0], values[1]).then(function (project) {
                        console.log("Project disliked! {{In Service}}");
                        resolve(project);
                    }).catch(function (err) {
                        console.log("Failed to dislike project {{In Service}}", err);
                        reject(err);
                    });
                }
                else {
                    console.log("Project disliked! {{In Service}}");
                    resolve(projects);
                }
            }).catch(function (err) {
                console.log("Failed to like project {{In Service}}", err);
                reject(err);
            });

    });
}

function shareProject(projectId, from, body) {
    return new Promise(function (resolve, reject) {

        var to = body.to;

        const mails = to.map(async emailTo => {
            var mailOptions = {
                from: config.email,
                // to: emailTo.mid + '@mindtree.com',
                to: emailTo.email,
                subject: from.name + ' has shared a Project caselet with you',
                text: 'Dear ' + emailTo.name + ',\n\n' + from.name + ' has shared the following project caselet with you.\n\n' + body.title + ' - ' + body.link + ' \n\n with the message "' + body.message + '". \n\nWe hope you get inspiration from the caselet. \n\nWarm regards, \nProject Caselets'
            };

            console.log(mailOptions);

            return mailer.sendMail(mailOptions)
                .then((info) => {
                    console.log("Info: ", info);
                    return info;
                }).catch(function (err) {
                    console.log("Failed to share project {{In Service}}", err);
                    reject(new Error("Failed to send email"));
                });
        });

        Promise.all(mails)
            .then((values) => {
                storyDao.shareProject(projectId, to.length)
                    .then(function (project) {
                        console.log("Project shared! {{In Service}}");
                        resolve(project);
                    }).catch(function (err) {
                        console.log("Failed to share project {{In Service}}", err);
                        reject(err);
                    });
            }).catch(function (err) {
                console.log("Failed to share project {{In Service}}", err);
                reject(err);
            });
    });
}

function getMostLikedProjects() {
    return new Promise(function (resolve, reject) {
        storyDao.getMostLikedProjects().then(function (project) {
            console.log("Most Liked projects retrieved! {{In Service}}");
            resolve(project);
        }).catch(function (err) {
            console.log("Failed to get most liked projects {{In Service}}", err);
            reject(err);
        });
    });
}

function getMostSharedProjects() {
    return new Promise(function (resolve, reject) {
        storyDao.getMostSharedProjects().then(function (project) {
            console.log("Most shared projects retrieved! {{In Service}}");
            resolve(project);
        }).catch(function (err) {
            console.log("Failed to get most shared projects {{In Service}}", err);
            reject(err);
        });
    });
}

module.exports = storyService;