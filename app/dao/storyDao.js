var Promise = require('bluebird');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const {
    User,
    Tool,
    Tag,
    Technology,
    Offering,
    SubVertical,
    SubPractice,
    Account,
    Vertical,
    Practice,
    Contract,
    Customer,
    Project
} = require('../config/sequelize');

var storyDao = {
    getProjects: getProjects,
    getSearchedProjects: getSearchedProjects,
    addProject: addProject,
    getProjectById: getProjectById,
    deleteProjectById: deleteProjectById,
    likeProject: likeProject,
    getLikedProject: getLikedProject,
    dislikeProject: dislikeProject,
    shareProject: shareProject,
    getMostLikedProjects: getMostLikedProjects,
    getMostSharedProjects: getMostSharedProjects,
    getProjectByProjectId: getProjectByProjectId
}

function getProjects(userMid, pageNo, limit) {
    return new Promise(function (resolve, reject) {
        Project.findAll({
            attributes: { exclude: ['projectDetails', 'challenges', 'solution', 'benefits', 'executionSummary', 'expertsOfTopic', 'offeringId', 'subVerticalId', 'serviceId', 'accountId', 'verticalId', 'practiceId', 'contractId', 'customerId'] },
            include: [Technology, Tool, Offering, Tag, SubVertical, SubPractice, Account, Vertical, Practice, Contract,
                {
                    model: Customer,
                    attributes: { include: ['id', 'name'], exclude: ['details'] }
                },
                {
                    model: User,
                    as: 'user',
                    attributes: { exclude: ['role'] }
                },
                {
                    model: User,
                    as: 'likes',
                    where: { mid: userMid },
                    required: false
                }
            ],
            offset: (pageNo - 1) * limit,
            limit: parseInt(limit, 10),
            subQuery: false
        })
            .then(function (project, err) {
                if (!err) {
                    console.log("Projects retrieved{{In DAO}}");
                    resolve(project);
                } else {
                    console.log("Failed to get projects {{In DAO}} ", err);
                    reject(new Error("Failed to get projects {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get projects {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get projects {{In DAO}}"));
            });
    });
}

function getSearchedProjects(projectIds, userMid, pageNo, limit) {
    return new Promise(function (resolve, reject) {
        Project.findAll({
            where: {
                id: {
                    [Op.in]: projectIds
                }
            },
            attributes: { exclude: ['projectDetails', 'challenges', 'solution', 'benefits', 'executionSummary', 'expertsOfTopic', 'offeringId', 'subVerticalId', 'serviceId', 'accountId', 'verticalId', 'practiceId', 'contractId', 'customerId'] },
            include: [Technology, Tool, Offering, Tag, SubVertical, SubPractice, Account, Vertical, Practice, Contract,
                {
                    model: Customer,
                    attributes: { include: ['id', 'name'], exclude: ['details'] }
                },
                {
                    model: User,
                    as: 'user',
                    attributes: { exclude: ['role'] }
                },
                {
                    model: User,
                    as: 'likes',
                    where: { mid: userMid },
                    required: false
                }
            ],
            offset: (pageNo - 1) * limit,
            limit: parseInt(limit, 10),
            subQuery: false
        })
            .then(function (project, err) {
                if (!err) {
                    console.log("Projects retrieved{{In DAO}}");
                    resolve(project);
                } else {
                    console.log("Failed to get projects {{In DAO}} ", err);
                    reject(new Error("Failed to get projects {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get projects {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get projects {{In DAO}}"));
            });
    });
}

function addProject(body, tags, technologies, tools) {
    return new Promise(function (resolve, reject) {
        Project.create(body)
            .then(async (project) => Promise.all(tags).then(storedTags => project.addTags(storedTags)).then(() => project))
            .then(async (project) => Promise.all(technologies).then(storedTechnologies => project.addTechnologies(storedTechnologies)).then(() => project))
            .then(async (project) => Promise.all(tools).then(storedTools => project.addTools(storedTools)).then(() => project))
            .then(async (project) => Project.findByPk(project.id, {
                include: [Technology, Tool, Offering, Tag, SubVertical, SubPractice, Account, Vertical, Practice, Contract, Customer,
                    {
                        model: User,
                        as: 'user',
                        attributes: { exclude: ['role'] }
                    }
                ]
            }))
            .then(async (projectWithAssociation, err) => {
                if (!err) {
                    console.log("Project added {{In DAO}}");
                    resolve(projectWithAssociation);
                } else {
                    console.log("Failed to add project {{In DAO}} ", err);
                    reject(new Error("Failed to add project {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to add project {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to add project {{In DAO}}"));
            });
    });
}

function getProjectById(projectId) {
    return new Promise(function (resolve, reject) {
        Project.findByPk(projectId, {
            include: [Technology, Tool, Offering, Tag, SubVertical, SubPractice, Account, Vertical, Practice, Contract, Customer,
                {
                    model: User,
                    as: 'user',
                    attributes: { exclude: ['role'] }
                }
            ]
        })
            .then((project, err) => {
                if (!err) {
                    console.log(project);
                    return project.increment('view_count', { by: 1 })
                } else {
                    console.log("Failed to get project by id {{In DAO}} ", err);
                    reject(new Error("Failed to get project by id {{In DAO}}"));
                }
            })
            .then((project, err) => {
                if (!err) {
                    console.log("Project retrieved by id {{In DAO}}");
                    resolve(project);
                } else {
                    console.log("Failed to get project by id {{In DAO}} ", err);
                    reject(new Error("Failed to get project by id {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get project by id {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get project by id {{In DAO}}"));
            });
    });
}

function getProjectByProjectId(projectId) {
    return new Promise(function (resolve, reject) {
        Project.findByPk(projectId, {
            attributes: ['id', 'title']
        })
            .then((project, err) => {
                if (!err) {
                    console.log("Project retrieved by id {{In DAO}}");
                    resolve(project);
                } else {
                    console.log("Failed to get project by id {{In DAO}} ", err);
                    reject(new Error("Failed to get project by id {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get project by id {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get project by id {{In DAO}}"));
            });
    });
}

function likeProject(project, user) {
    return new Promise(function (resolve, reject) {
        user.addLike(project)
            .then(async () => {
                project.increment('like')
                    .then((project, err) => {
                        if (!err) {
                            console.log("Project liked by id {{In DAO}}");
                            resolve(project);
                        } else {
                            console.log("Failed to increment like count of project by id {{In DAO}} ", err);
                            reject(new Error("Failed to increment like count of project by id {{In DAO}}"));
                        }
                    }).catch((error) => {
                        console.log("Failed to increment like count of project by id {{In DAO}}");
                        console.log('Error', error);
                        reject(new Error("Failed to increment like count of project by id {{In DAO}}"));
                    });
            }).catch((error) => {
                console.log("Failed to like project by id {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to like project by id {{In DAO}}"));
            });
    });
}

function getLikedProject(projectId, userMid) {
    return new Promise(function (resolve, reject) {

        Project.findByPk(projectId, {
            attributes: ['id', 'title'],
            include: [{
                model: User,
                as: 'likes',
                where: { mid: userMid },
                required: false
            }]
        })
            .then((project, err) => {
                if (!err) {
                    console.log("Project retrieved by id {{In DAO}}");
                    resolve(project);
                } else {
                    console.log("Failed to get project by id {{In DAO}} ", err);
                    reject(new Error("Failed to get project by id {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get project by id {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get project by id {{In DAO}}"));
            });
    });
}

function dislikeProject(project, user) {
    return new Promise(function (resolve, reject) {
        user.removeLike(project)
            .then(async () => {
                project.decrement('like')
                    .then((project, err) => {
                        if (!err) {
                            console.log("Project disliked by id {{In DAO}}");
                            resolve(project);
                        } else {
                            console.log("Failed to decrement like count of project by id {{In DAO}} ", err);
                            reject(new Error("Failed to decrement like count of project by id {{In DAO}}"));
                        }
                    }).catch((error) => {
                        console.log("Failed to decrement like count of project by id {{In DAO}}");
                        console.log('Error', error);
                        reject(new Error("Failed to decrement like count of project by id {{In DAO}}"));
                    });
            }).catch((error) => {
                console.log("Failed to dislike project by id {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to dislike project by id {{In DAO}}"));
            });
    });
}

function shareProject(projectId, count) {
    return new Promise(function (resolve, reject) {

        Project.increment('share', { by: count, where: { id: projectId } })
            .then(async () => Project.findByPk(projectId, {
                include: [Technology, Tool, Offering, Tag, SubVertical, SubPractice, Account, Vertical, Practice, Contract, Customer,
                    {
                        model: User,
                        as: 'user',
                        attributes: { exclude: ['role'] }
                    }
                ]
            }))
            .then((project, err) => {
                if (!err) {
                    console.log("Project share count incremented by id {{In DAO}}");
                    resolve(project);
                } else {
                    console.log("Failed to increment share count of project by id {{In DAO}} ", err);
                    reject(new Error("Failed to increment share count of project by id {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to increment share count of project by id {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to increment share count of project by id {{In DAO}}"));
            });

    });
}

function getMostLikedProjects() {
    return new Promise(function (resolve, reject) {
        Project.findAll({
            order: [["like", "DESC"]],
            limit: 3,
            attributes: ['id', 'title', 'coverImage'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: { exclude: ['role'] }
                }
            ]
        })
            .then(function (project, err) {
                if (!err) {
                    console.log("Most Liked projects retrieved {{In DAO}}");
                    resolve(project);
                } else {
                    console.log("Failed to get most liked projects {{In DAO}} ", err);
                    reject(new Error("Failed to get most liked projects {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get most liked projects {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get most liked projects {{In DAO}}"));
            });
    });
}

function getMostSharedProjects() {
    return new Promise(function (resolve, reject) {
        Project.findAll({
            order: [["share", "DESC"]],
            limit: 3,
            attributes: ['id', 'title', 'coverImage'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: { exclude: ['role'] }
                }
            ]
        })
            .then(function (project, err) {
                if (!err) {
                    console.log("Most shared projects retrieved {{In DAO}}");
                    resolve(project);
                } else {
                    console.log("Failed to get most shared projects {{In DAO}} ", err);
                    reject(new Error("Failed to get most shared projects {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to get most shared projects {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to get most shared projects {{In DAO}}"));
            });
    });
}

function deleteProjectById(projectId) {
    return new Promise(function (resolve, reject) {
        Project.destroy({
            where: { id: projectId }
        })
            .then(function (deleteResponse, err) {
                if (!err) {
                    console.log("Project deleted by id {{In DAO}}");
                    resolve(deleteResponse);
                } else {
                    console.log("Failed to delete project by id {{In DAO}} ", err);
                    reject(new Error("Failed to delete project by id {{In DAO}}"));
                }
            }).catch((error) => {
                console.log("Failed to delete project by id {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to delete project by id {{In DAO}}"));
            });
    });
}

module.exports = storyDao;