module.exports = (sequelize, Sequelize) => {
    class Customer extends Sequelize.Model { }
    Customer.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        details: Sequelize.TEXT
    },
    {
        timestamps: false,
        underscored: true,
        modelName: 'customer',
        sequelize
    });
    return Customer;
}