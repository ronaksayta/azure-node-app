module.exports = (sequelize, Sequelize) => {
    class SubPractice extends Sequelize.Model {}
    SubPractice.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING
    },
    {
        timestamps: false,
        underscored: true,
        modelName: 'sub_practice',
        sequelize
    });
    return SubPractice;
}