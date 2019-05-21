module.exports = (sequelize, Sequelize) => {
    class ProjectCaselet extends Sequelize.Model {} 
    ProjectCaselet.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expertsOfTopic: Sequelize.STRING,
        domain: Sequelize.STRING,
        coverImage: Sequelize.STRING,
        engineering: Sequelize.STRING,
        projectDetails: Sequelize.TEXT,
        challenges: Sequelize.TEXT,
        solution: Sequelize.TEXT,
        benefits: Sequelize.TEXT,
        executionSummary: Sequelize.TEXT,
        submittedTime: Sequelize.DATE,
        approvedBy: Sequelize.STRING,
        viewCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        like: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        share: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        download: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
            timestamps: true,
            createdAt: 'approvedTime',
            updatedAt: false,
            underscored: true,
            sequelize
        })
   return ProjectCaselet;
}