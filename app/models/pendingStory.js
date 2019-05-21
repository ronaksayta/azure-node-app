module.exports = (sequelize, Sequelize) => {
    class PendingCaselet extends Sequelize.Model { }
    PendingCaselet.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: Sequelize.STRING,
        expertsOfTopic: Sequelize.STRING,
        domain: Sequelize.STRING,
        coverImage: Sequelize.STRING,
        engineering: Sequelize.STRING,
        account: Sequelize.STRING,
        benefits: Sequelize.TEXT,
        challenges: Sequelize.TEXT,
        contract: Sequelize.STRING,
        customerName: Sequelize.STRING,
        customerDetails: Sequelize.TEXT,
        subVertical: Sequelize.STRING,
        offering: Sequelize.STRING,
        practice: Sequelize.STRING,
        projectDetails: Sequelize.TEXT,
        subPractice: Sequelize.STRING,
        solution: Sequelize.TEXT,
        executionSummary: Sequelize.TEXT,
        tags: Sequelize.STRING,
        technologies: Sequelize.STRING,
        tools: Sequelize.STRING,
        vertical: Sequelize.STRING,
        adminComment: Sequelize.TEXT,
        submit: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    },
        {
            underscored: true,
            sequelize
        })
    return PendingCaselet;
}