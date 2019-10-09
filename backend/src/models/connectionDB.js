const Sequelize = require('sequelize');
const sequelize = new Sequelize('bigfeed', 'kronos', 'root123', {
    host: 'localhost',
    dialect: 'mysql'    
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};