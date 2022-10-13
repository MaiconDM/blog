const Sequelize = require("sequelize");
const connection = new Sequelize('guiapress', 'root', 'SenhaBD',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    timezone: "-03:00"
});

module.exports = connection
