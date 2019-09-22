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
        
        return res.json({ response: 200 });
    },

    async select(req, res) { // Função utilizada na tela de Login do usuario
         
        const {
            usuario,
            senha } = req.body;
        
        const user = await User.findOne({
            where: {
                senha: senha,
                [Op.or]: [{email: usuario}, {apelido: usuario}, {nome: usuario}],
            }});
        
        if(user == '')
            return res.json({usuario:usuario, response: false});

        return res.json({user, response: 200 });
    },

    async update(req, res) {

        const { 
            nome,  
            apelido, 
            email, 
            senhaNova, 
            senhaAtual } = req.body;
        
        const { id } = req.params;
        
        if (senhaNova && senhaAtual) {
            
            // Fazer query para verificar se a senha atual inserida é do usuário
            const query =  await User.findAll({
                attributes: ['senha'],
                 where: { id:id, senha: senhaAtual }});
            
            if (query == '')
                return res.json({response: 'Senha Atual não está correta'});
            
            const password = await User.update({
                senha: senhaNova ,
                where: { id: id }});
            
            if (password == '')
                return res.json({response: 'Operação não conluida com exito'});
            
            return res.json({ response: 200 });
        }

        if(nome || apelido || email) {

            const user = await User.update({
                nome: (nome  ? nome.trim(): nome),
                apelido: (apelido ? apelido.trim(): apelido),
                email: (email ? email.trim(): email) },
                { where: { id: id }});

            if (user == '')
                return res.json({ response: 'Operação não conluida com exito' });

            return res.json({ user, response: 200 });
        }

        return res.json({ response: false });
    },

    async show(req, res) {
      
        const user  = await User.findAll({
            
        });
        
        if (!user) 
            return res.json({response:'entrei no set'});
        
        return res.json({response: 200});
    }
};