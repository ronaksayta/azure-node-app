module.exports = (sequelize, Sequelize) => {
    class Image extends Sequelize.Model {}
    Image.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        url: Sequelize.STRING
    },
    {
        timestamps: false,
        underscored: true,
        modelName: 'image',
        sequelize
    });
    return Image;
}