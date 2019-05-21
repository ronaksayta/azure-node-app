module.exports = (sequelize, Sequelize) => {
    class Account extends Sequelize.Model {}
    Account.init({
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
        modelName: 'account',
        sequelize
    });
    return Account;
}