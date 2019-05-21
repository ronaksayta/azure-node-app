module.exports = (sequelize, Sequelize) => {
    class User extends Sequelize.Model { }
    User.init({
        mid: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: Sequelize.STRING,
        role: {
            type: Sequelize.STRING,
            defaultValue: 'user'
        }
    },
        {
            timestamps: false,
            underscored: true,
            modelName: 'user',
            sequelize
        });
    return User;
}