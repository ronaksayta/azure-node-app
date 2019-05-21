module.exports = (sequelize, Sequelize) => {
    class SubVertical extends Sequelize.Model {}
    SubVertical.init({
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
        modelName: 'sub_vertical',
        sequelize
    });
    return SubVertical;
}