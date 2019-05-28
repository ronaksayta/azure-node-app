const Sequelize = require('sequelize');

var config = require('./config');

var ProjectModel = require('../models/project');
var UserModel = require('../models/user');
var TagModel = require('../models/tag');
var ToolModel = require('../models/tool');
var TechnologyModel = require('../models/technology');
var OfferingModel = require('../models/offering');
var SubVerticalModel = require('../models/subVertical');
var SubPracticeModel = require('../models/subPractice');
var AccountModel = require('../models/account');
var VerticalModel = require('../models/vertical');
var PracticeModel = require('../models/practice');
var ContractModel = require('../models/contract');
var CustomerModel = require('../models/customer');
var PendingStoryModel = require('../models/pendingStory');
var ImageModel = require('../models/image');

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: {
        options: {
            requestTimeout: 200000,
            encrypt: true
        }
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 50000,
        idle: 20000
      },
    logging: false
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully!');
    })
    .catch(err => {
        console.error('Unable to connect to the database: ', err);
    });

const User = UserModel(sequelize, Sequelize);
const SubVertical = SubVerticalModel(sequelize, Sequelize);
const SubPractice = SubPracticeModel(sequelize, Sequelize);
const Account = AccountModel(sequelize, Sequelize);
const Vertical = VerticalModel(sequelize, Sequelize);
const Practice = PracticeModel(sequelize, Sequelize);
const Contract = ContractModel(sequelize, Sequelize);
const Customer = CustomerModel(sequelize, Sequelize);
const Offering = OfferingModel(sequelize, Sequelize);
const ProjectTag = sequelize.define('project_tag', {}, { timestamps: false, underscored: true });
const ProjectTechnology = sequelize.define('project_technology', {}, { timestamps: false, underscored: true });
const ProjectTool = sequelize.define('project_tool', {}, { timestamps: false, underscored: true });
const ProjectLikes = sequelize.define('project_likes', {}, { underscored: true });
const Tag = TagModel(sequelize, Sequelize);
const Tool = ToolModel(sequelize, Sequelize);
const Technology = TechnologyModel(sequelize, Sequelize);
const Project = ProjectModel(sequelize, Sequelize);
const PendingStory = PendingStoryModel(sequelize, Sequelize);
const Image = ImageModel(sequelize, Sequelize);

SubPractice.belongsTo(Practice, { foreignKey: 'practiceId', underscored: true });
Project.belongsToMany(Tag, { through: ProjectTag, unique: false });
Tag.belongsToMany(Project, { through: ProjectTag, unique: false });
Project.belongsToMany(Technology, { through: ProjectTechnology, unique: false });
Technology.belongsToMany(Project, { through: ProjectTechnology, unique: false });
Project.belongsToMany(Tool, { through: ProjectTool, unique: false });
Tool.belongsToMany(Project, { through: ProjectTool, unique: false });
Project.belongsTo(Offering, { foreignKey: 'offeringId', underscored: true });
Project.belongsTo(User, { as: 'user', foreignKey: 'userMid', underscored: true });
Project.belongsTo(SubVertical, { foreignKey: 'subVerticalId', underscored: true });
Project.belongsTo(SubPractice, { foreignKey: 'subPracticeId', underscored: true });
Project.belongsTo(Account, { foreignKey: 'accountId', underscored: true });
Project.belongsTo(Vertical, { foreignKey: 'verticalId', underscored: true });
Project.belongsTo(Practice, { foreignKey: 'practiceId', underscored: true });
Project.belongsTo(Contract, { foreignKey: 'contractId', underscored: true });
Project.belongsTo(Customer, { foreignKey: 'customerId', underscored: true });
PendingStory.belongsTo(User, { foreignKey: 'userMid', underscored: true });
Project.belongsToMany(User, { through: ProjectLikes, as: 'likes', unique: false, foreignKey: 'projectCaseletId' });
User.belongsToMany(Project, { through: ProjectLikes, as: 'likes', unique: false, foreignKey: 'userMid' });

async function createTables() {
    // return await sequelize.sync({ force: true })
    return await sequelize.sync()
        .then(async () => {
            console.log(`Tables created in the database!`);
        }).catch(function (err) {
            console.log("Failed to create tables in the database: ", err);
            reject(err);
        });
}

module.exports = {
    User,
    Tool,
    Tag,
    Technology,
    Offering,
    SubVertical,
    SubPractice,
    Account,
    Vertical,
    Practice,
    Contract,
    Customer,
    Project,
    PendingStory,
    Image,
    createTables
};