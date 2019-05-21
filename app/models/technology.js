module.exports = (sequelize, Sequelize) => {
    class Technology extends Sequelize.Model {}
    Technology.init({
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
        modelName: 'technology',
        sequelize
    });
    return Technology;
}