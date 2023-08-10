const Sequelize = require('sequelize');

//Conexão com o banco de dados
const sequelize = new Sequelize('postapp', 'root', 'Bomdia2005', {
    host: "localhost",
    port: "3306",
    dialect: 'mysql'
});

//Exportar variaveis
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}