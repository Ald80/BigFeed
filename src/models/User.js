const db =  require('./connectionDB');
const User = db.sequelize.define('usuario', {
    // Definindo os campos

    nome: {
        type: db.Sequelize.STRING
    },

    apelido: {
        type: db.Sequelize.STRING
    },

    email: {
        type: db.Sequelize.STRING
    },

    senha: {
        type: db.Sequelize.STRING
    }
});

//User.sync({force:true});

module.exports = User;