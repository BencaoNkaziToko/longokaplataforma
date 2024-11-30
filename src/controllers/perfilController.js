const mysql = require('mysql')
const connection = require('../database/database')
const { render } = require('ejs')
const curso = require('../controllers/publicoController')

exports.verPerfil = async (req, res) => {
    const { id } = req.params;
    const queryDadosInstiuicao = `
        SELECT * 
        FROM instituicao 
        JOIN provincia ON instituicao.idProvincia = provincia.id 
        JOIN curso ON curso.idInstituicao = instituicao.idInstituicao 
        WHERE instituicao.idInstituicao = ${id}
    `;

    connection.query(queryDadosInstiuicao, (error, instituicao) => {
        if (error) throw error;

        // Ordenar o array 'instituicao' pelo campo 'nome' de forma alfabética
        instituicao.sort((a, b) => a.nome.localeCompare(b.nome));
        // Enviar o vetor já ordenado para o render
        res.render('Publico/perfil', { instituicao });
    });
};


 exports.baixar = async(req, res) =>{
    
    const {idInst, idCur} = req.body
    queryDadosInstiuicao = `SELECT *from instituicao JOIN provincia ON instituicao.idProvincia = provincia.id JOIN curso ON curso.idInstituicao = instituicao.idInstituicao WHERE instituicao.idInstituicao = ${idInst} and idCurso=${idCur}`
    connection.query(queryDadosInstiuicao, (error, instituicao)=> {
        res.render('Publico/baixar', {instituicao})
    })

 }

 

 exports.voltarPerfil = async(req, res) =>{
    const {id} = req.params
    queryDadosInstiuicao = `SELECT *from instituicao JOIN provincia ON instituicao.idProvincia = provincia.id JOIN curso ON curso.idInstituicao = instituicao.idInstituicao WHERE instituicao.idInstituicao = ${id}`
    connection.query(queryDadosInstiuicao, (error, instituicao)=>{
        if(error) throw error
        res.render('Publico/perfil', {instituicao})
    })
    
 }