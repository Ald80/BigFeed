import db from './connectionDB';
const Post = db.sequelize.define('Postagens', {
    // Definindo os campos 
    image:{
        type:db.Sequelize.STRING
    },

    texto: {
        type:db.Sequelize.STRING

    },    
});


// Cria tabela com os respectivos campos 
//Post.sync({force:true});

module.exports = Post;

