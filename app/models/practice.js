module.exports = (sequelize, Sequelize) => {
    class Practice extends Sequelize.Model {}
    Practice.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true
        }
    },
    {
        timestamps: false,
        underscored: true,
        modelName: 'practice',
        sequelize
    });
    return Practice;
}