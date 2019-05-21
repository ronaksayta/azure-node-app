module.exports = (sequelize, Sequelize) => {
    class Vertical extends Sequelize.Model {}
    Vertical.init({
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
        modelName: 'vertical',
        sequelize
    });
    return Vertical;
}