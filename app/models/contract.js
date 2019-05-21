module.exports = (sequelize, Sequelize) => {
    class Contract extends Sequelize.Model {}
    Contract.init({
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
        modelName: 'contract',
        sequelize   
    });
    return Contract
}