const User = require('../models/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = {

   async insert(req, res) {  

        const {
             nome, 
             apelido, 
             email, 
             senha } = req.body;

        const userExists = await User.findOne({
                where: {
                    nome: nome, 
                    apelido: apelido, 
                    email: email,
                    senha: senha}});
        if(userExists) 
            return res.json(userExists);
        
        const user = await User.create({
            nome: nome,
            apelido: apelido,
            email: email,
            senha: senha });
        
        return res.json({response: true});
    },

    async select(req, res) {
        
        const {
            usuario,
            senha } = req.body;
        
        const user = await User.findAll({
            where: {
                senha: senha,
                [Op.or]: [{email: usuario}, {apelido: usuario}],
            }
        });
        
        if(user == '')
            return res.json({usuario:usuario, response: false});

        return res.json({usuario:usuario, response:true});
    }
}