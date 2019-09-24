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
            return res.status(400).json({userExists, response: 'Usuário já existe'});
        
        const user = await User.create({
            nome: nome,
            apelido: apelido,
            email: email,
            senha: senha });
        
        return res.status(200).json({ response: 'Operação concluido com exito' });
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
            return res.status(404).json({usuario:usuario, response: 'Usuário não encontrado'});

        return res.json({user, response: 'Operação concluida com exito'});
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
                return res.status(500).json({response: 'Não foi possível atualizar senha'});
            
            return res.status(200).json({ response: 'Senha atualizada com sucesso' });
        }

        if(nome || apelido || email) {

            const user = await User.update({
                nome: (nome  ? nome.trim(): nome),
                apelido: (apelido ? apelido.trim(): apelido),
                email: (email ? email.trim(): email) },
                { where: { id: id }});

            if (user == '')
                return res.status(400).json({ response: 'Atualização falhou' });

            return res.status(200).json({ user, response: 'Atualização realizada com sucesso' });
        }

        return res.status(400).json({ response: 'Operação falhou' });
    },

    async show(req, res) {
        
        const user  = await User.findAll({
            
        });
       // O problema esta na rota que leva a função select()
       // Que e a mesma rota dessa função 
        if (user == '') 
            return res.status(400).json({response:'Operaçao falhou'});

        return res.status(200).json({user, response: 'Operação bem sucedida'});
    },

    async delete(req, res){

        const { id } = req.params;

        if (id == '')
            return res.status(400).json({response: 'Valor de id vazio'});
        
        const user = await User.destroy({
            where : {id:id}
        });

        if (user == '')
            return res.status(400).json({response: 'Exclusão falhou'});
        
        return res.status(200).json({response: 'Exclusão efetuada com sucesso'});
    }

};