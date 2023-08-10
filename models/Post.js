const db = require('./db');

//Criando a tabela postagens
const Post = db.sequelize.define('postagens', {
    titulo:{ 
        type: db.Sequelize.STRING
    }, 
    conteudo:{
        type: db.Sequelize.TEXT
    },
    img: {
        type: db.Sequelize.STRING
    }
});

//Post.sync({force: true});

module.exports = Post;