module.exports = (sequelize, Sequelize) => {
    class Tag extends Sequelize.Model {}
    Tag.init({
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
        modelName: 'tag',
        sequelize
    });
    return Tag;
}