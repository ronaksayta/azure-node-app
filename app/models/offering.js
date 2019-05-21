module.exports = (sequelize, Sequelize) => {
    class Offering extends Sequelize.Model {}
    Offering.init({
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
        modelName: 'offering',
        sequelize
    });
    return Offering;
}