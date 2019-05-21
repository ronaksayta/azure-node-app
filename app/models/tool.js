module.exports = (sequelize, Sequelize) => {
    class Tool extends Sequelize.Model {}
    Tool.init({
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
        modelName: 'tool',
        sequelize
    });
    return Tool;
}