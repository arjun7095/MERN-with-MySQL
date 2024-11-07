const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => console.log('Connected to MySQL database!'))
    .catch((err) => console.error('Unable to connect to database:', err));

module.exports = sequelize;
