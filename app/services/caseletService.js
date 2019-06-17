var Promise = require('bluebird');
var AzureSearch = require('azure-search');
var config = require('../config/config');
var mailer = require('../util/mailer');

var caseletDao = require('../dao/caseletDao');
var userDao = require('../dao/userDao');
var pendingCaseletDao = require('../dao/pendingCaseletDao');

var caseletService = {
    getProjects: getProjects,
    getProjectById: getProjectById,
    likeProject: likeProject,
    dislikeProject: dislikeProject,
    shareProject: shareProject,
    getMostLikedProjects: getMostLikedProjects,
    getMostSharedProjects: getMostSharedProjects,
    addPendingCaselet: addPendingCaselet,
    downloadProject: downloadProject,
    getSavedStoriesByUser: getSavedStoriesByUser,
    searchAndFilterProject: searchAndFilterProject,
    getProjectByPagination: getProjectByPagination
}

function getProjectByPagination(mid, limit, pageNo) {
    return new Promise((resolve, reject) => {
        caseletDao.getProjectIdByPagination(limit, pageNo)
        .then((projects) => {
            projectArray = [];
            projects.map(project => projectArray.push(project.id));
            caseletDao.getProjectsByArray(projectArray, mid).then((projects) => {
                resolve(projects)
            }).catch((error) => {
                reject(error)
            })
        }).catch((error) => {
            reject(error);
        });
    });
}

function downloadProject(projectId) {
    return new Promise((resolve, reject) => {
        caseletDao.downloadProject(projectId)
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
    return new Promise((resolve, reject) => {
        caseletDao.getProjects(userMid, pageNo, limit)
            .then(function (projects) {
                var projectLiked = projects.map(project => {
                    if (project.dataValues.likes.length == 0)
                        project.dataValues.liked = false
                    else
                        project.dataValues.liked = true;

                    return project;
                });
                console.log("Projects retrieved! {{In Service}}");
                resolve(projectLiked);
            }).catch(function (err) {
                console.log("Failed to get projects {{In Service}}", err);
                reject(err);
            });
    });
}

function addPendingCaselet(body, user) {
    return new Promise((resolve, reject) => {

        console.log(user);

        pendingCaseletDao.getSavedStoriesByUser(user.mid)
            .then((caselet) => {
                if (caselet) {

                    let b = body;
                    console.log('Service', b);
                    b.tags = body.tags.join();
                    b.technologies = body.technologies.join();
                    b.tools = body.tools.join();
                    b.customerName = body.customer.name;
                    b.customerDetails = body.customer.details;
                    console.log(b.customerName);
                    b.expertsOfTopic = body.expertsOfTopic.join();

                    pendingCaseletDao.updatePendingCaselet(b, user.mid)
                        .then((caselet) => {
                            console.log("Pending Caselet updated! {{In Service}}");
                            resolve(caselet);
                        }).catch(function (err) {
                            console.log("Failed to update pending caselet {{In Service}}", err);
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

                            pendingCaseletDao.addPendingCaselet(b)
                                .then(function (projectAdded) {
                                    console.log("Pending Caselet added! {{In Service}}");
                                    resolve(projectAdded);
                                }).catch(function (err) {
                                    console.log("Failed to add pending caselet {{In Service}}", err);
                                    reject(err);
                                });
                        });
                }
            }).catch(function (err) {
                console.log("Failed to add/update pending caselet {{In Service}}", err);
                reject(err);
            });
    });
}

function getSavedStoriesByUser(userMid) {
    return new Promise((resolve, reject) => {
        pendingCaseletDao.getSavedStoriesByUser(userMid)
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
    return new Promise((resolve, reject) => {
        caseletDao.getProjectById(projectId)
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
    return new Promise((resolve, reject) => {

        const projects = caseletDao.getProjectByProjectId(projectId);
        const users = userDao.addUser(user);
        const likedProject = caseletDao.getLikedProject(projectId, user.mid);

        Promise.all([likedProject, projects, users])
            .then((values) => {
                console.log("Liked Project: ", values[0].likes.length);
                if (values[0].likes.length == 0) {
                    caseletDao.likeProject(values[1], values[2]).then(function (project) {
                        console.log("Project liked! {{In Service}}");
                        resolve(project);
                    }).catch(function (err) {
                        console.log("Failed to like project {{In Service}}", err);
                        reject(err);
                    });
                }                 
                else if (values[0].likes.length == 1) {
                    caseletDao.dislikeProject(values[0], values[2]).then(function (project) {
                        console.log("Project disliked! {{In Service}}");
                        resolve({
                            message : 'Project diskliked!'
                        });
                    }).catch(function (err) {
                        console.log("Failed to dislike project {{In Service}}", err);
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
    return new Promise((resolve, reject) => {

        const projects = caseletDao.getLikedProject(projectId, user.mid);
        const users = userDao.addUser(user);

        Promise.all([projects, users])
            .then((values) => {
                console.log("Liked Project: ", values[0].likes.length);

                if (values[0].likes.length != 0) {
                    caseletDao.dislikeProject(values[0], values[1]).then(function (project) {
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
    return new Promise((resolve, reject) => {

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
                caseletDao.shareProject(projectId, to.length)
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
    return new Promise((resolve, reject) => {
        caseletDao.getMostLikedProjects().then(function (project) {
            console.log("Most Liked projects retrieved! {{In Service}}");
            resolve(project);
        }).catch(function (err) {
            console.log("Failed to get most liked projects {{In Service}}", err);
            reject(err);
        });
    });
}

function getMostSharedProjects() {
    return new Promise((resolve, reject) => {
        caseletDao.getMostSharedProjects().then(function (project) {
            console.log("Most shared projects retrieved! {{In Service}}");
            resolve(project);
        }).catch(function (err) {
            console.log("Failed to get most shared projects {{In Service}}", err);
            reject(err);
        });
    });
}

function searchAndFilterProject(searchValue, filterValue, pageNo, limit, userMid, technologies, tools) {
    return new Promise((resolve, reject) => {
        var client = AzureSearch({
            url: config.searchUrl,
            key: config.queryKey
        });
        client.search(config.index, { search: searchValue, filter: filterValue }, function (err, results) {
            if (!err) {

                const searchedIds = results.map(result => parseInt(result.id));
                console.log(searchedIds);
                console.log("Technologies: ", technologies);
                console.log("Tools: ", tools);

                var tech;

                if (typeof technologies == "undefined" || technologies.length == 0) {
                    tech = null;
                }
                else {
                    tech = technologies.split(',').map(function (item) {
                        return parseInt(item, 10);
                    });
                }

                var tool;
                if (typeof tools == "undefined" || tools.length == 0) {
                    tool = null;
                }
                else {
                    tool = tools.split(',').map(function (item) {
                        return parseInt(item, 10);
                    });
                }

                console.log("Tech: ", tech);
                console.log("Tool: ", tool);
                caseletDao.getSearchedProjects(searchedIds, tech, tool)
                    .then(function (project) {
                        const ids = project.map(res => parseInt(res.dataValues.id));
                        console.log(ids);

                        caseletDao.getResults(ids, userMid, pageNo, limit)
                            .then((result) => {

                                var caselets = result.map(res => {
                                    if (res.dataValues.likes.length == 0)
                                        res.dataValues.liked = false
                                    else
                                        res.dataValues.liked = true;

                                    return res;
                                });
                                
                                var caselet = caselets.sort((a, b) => {
                                    return searchedIds.indexOf(a.dataValues.id) - searchedIds.indexOf(b.dataValues.id);
                                });

                                // console.log(caselet);
                                caselet.map(s => console.log(s.dataValues.id));

                                console.log("Projects retrieved! {{In Service}}");
                                resolve(caselet);
                            })
                            .catch(function (err) {
                                console.log("Failed to get projects {{In Service}}", err);
                                reject(err);
                            });
                    })
                    .catch(function (err) {
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

module.exports = caseletService;