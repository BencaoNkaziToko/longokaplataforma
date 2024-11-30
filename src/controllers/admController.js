const connection = require('../database/database')
const mysql = require('mysql')
const bcrypt = require('bcryptjs')
const express = require('express')
const session = require('express-session')
var multer = require('multer');
var fs = require('fs')
const path = require("path");
const app = express();

const dataFormatada = require('../helpers/dataAtual')
const { error } = require('console')




//FUNCAO PARA CRIPOGRAFIA BCRYPT JS
const encrypt = (textpPlain) => {
    const hash = bcrypt.hash(textpPlain, 10)
    return hash
}

app.use(session({
    secret: "jkhfjksdhfsdfs",
    resave: true,
    saveUninitialized: true
}))

let nomeUs
function gerarCodigoAleatorio() {
    const tamanhoCodigo = 10; // Tamanho do código que deseja gerar
    const caracteres = '123456789ABCDEFGHIJabcdefghijklmnopqrstuvwxyzxKLMNOPQRSTUVWXYZ'; // Caracteres permitidos para gerar o código
    let codigo = '';
  
    for (let i = 0; i < tamanhoCodigo; i++) {
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length)); // Adiciona um caractere aleatório ao código
    }
  
    return codigo;
  }
  
  
  
  let  codigoAleatorio = "G-" + gerarCodigoAleatorio();
  

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// AUTENTICACAO DO ADMINISTRADOR ✅💭
exports.admLogin = async(req, res)=>{
    //connection.query('')
    let mensagem = false
    res.render('./Admin/pages/authentication', { mensagem})
}
    
exports.verificar = async(req, res)=>{
    res.send(req.session.loggedin)
}

//auth admin
exports.admAuth = async(req, res)=> {
    const {password, user} = req.body
   let sql1 = `SELECT COUNT(*) AS quantidade_privadas FROM instituicao WHERE tipo = 'privada'`;
   let sql2 = `SELECT COUNT(*) AS quantidade_publicas FROM instituicao WHERE tipo = 'publica'`;
   let sql3 = `SELECT COUNT(*) AS quantidade_bibliografias FROM material_didactico`
    connection.query(`SELECT *FROM administrador WHERE nomeUsuario ='${user}' and senha='${password}'`, (error, results)=> {
        if(results.length == 1){
            req.session.loggedin = true
            req.session.utilizador = results[0]
            let nome = results[0].nomeUsuario
            nomeUs = results[0].nomeUsuario
            connection.query('SELECT *FROM instituicao INNER JOIN provincia ON instituicao.idProvincia = provincia.id order by nomeInstituicao', (error, results)=> {
                if(error) throw error
                connection.query(sql1, (error, privadas)=> {
                    if(error) throw error
                    connection.query(sql2, (error, publicas)=> {
                        if(error) throw error
                        connection.query(sql3, (error, bibliografias)=> {
                            if(error) throw error
                            connection.query('select *from provincia', (error, provincias)=> {
                                if(error) throw error
                                res.render('./Admin/pages/index', {instituicoes:results, bibliografias, privadas, publicas,provincias, alert_2: true, user, nome, userdata: req.session.utilizador})
                            })
                        })
                    })
                })
            })
        }else{
            let mensagem = true
            res.render('./Admin/pages/authentication', {mensagem})

        }
    })
}

exports.logoutAdm = async(req, res)=>{
    let mensagem = false
    req.session.loggedin = false
    req.session.destroy()
    res.render('./Admin/pages/authentication',{mensagem})
}



//Biblioteca ADm mg 
exports.admBiblioteca = async(req, res)=> {
        res.redirect('/admLogin')    
}



//New Admin
exports.adminRegister = async(req, res)=> {
    res.render('./Admin/register')
}

exports.cadAdmin = async(req, res)=> {
    const {nomeCompleto, nomeUsuario, password} = req.body
    const passWordHash = await encrypt(password)
    await connection.query(`INSERT INTO administrador VALUES(NULL, '${nomeCompleto}', '${nomeUsuario}', '${passWordHash}')`, (error, result)=>{
        if(error) throw error
        res.send('Cadastro com sucesso...'+nomeCompleto+"|"+nomeUsuario+"|"+passWordHash)
    })
       
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////// GESTAO DE INSTITUICOES - ADMINISTRADOR DO SISTEMA - CRUD ✅
exports.admHome = async(req, res) =>{ 
   let sql1 = `SELECT COUNT(*) AS quantidade_privadas FROM instituicao WHERE tipo = 'privada'`;
   let sql2 = `SELECT COUNT(*) AS quantidade_publicas FROM instituicao WHERE tipo = 'publica'`;
   let sql3 = `SELECT COUNT(*) AS quantidade_bibliografias FROM material_didactico`
   
    req.session.loggedin = true
    req.session.user
    if(req.session.user){
        connection.query(sql1, (error, privadas)=> {
            if(error) throw error
            connection.query(sql2, (error, publicas)=> {
                if(error) throw error
                connection.query(sql3, (error, bibliografias)=> {
                    res.render('./Admin/pages/index', {instituicoes:results, bibliografias, privadas, publicas, alert_2: true, user, nome, userdata: req.session.utilizador})
                })
            })
        })    
    }else{
        connection.query(sql1, (error, privadas)=> {
            if(error) throw error
            connection.query(sql2, (error, publicas)=> {
                if(error) throw error
                connection.query(sql3, (error, bibliografias)=> {
                    if(error) throw error
                    res.render('./Admin/pages/index', {bibliografias, privadas, publicas, alert_2: true, nome: req.session.utilizador})
                })
            })
        })                 
    }
}


//// ----> LISTAR TODAS INSTITUICOEES ✅
exports.adminstituicoes = async(req, res) =>{
        res.redirect('/instit')
}



exports.instit = async(req, res) =>{
    req.session.loggedin = true
    req.session.user_Name
    sql1 = `SELECT COUNT(tipo) AS publicas FROM instituicao WHERE tipo = 'Pública'`
    sql2 = `SELECT COUNT(tipo) AS privadas FROM instituicao WHERE tipo = 'Privada'`
    sql = `SELECT *FROM instituicao INNER JOIN provincia ON instituicao.idProvincia = provincia.id order by instituicao.nomeInstituicao desc`
    connection.query(sql, (error, results)=> {
        connection.query('select *from provincia', (error, provincias)=> {
            connection.query(sql1, (error, publica)=> {
                connection.query(sql2, (error, privada)=> {
                    if(error) throw error
                    res.render('./Admin/pages/institituicoes', {instituicoes: results, nome: nomeUs, provincias, user: req.session.user_Name, publica, privada})
                })
            })
        })
    })
}

///// ----> VER UMA INSTITUICAO EM PARTICULAR ✅
exports.verInstituicao = async(req, res)=> {
    req.session.loggedin = true
    const {id} = req.body
    sql = `select *from curso right join instituicao on curso.idInstituicao = instituicao.idInstituicao inner join provincia on instituicao.idProvincia = provincia.id  where instituicao.idInstituicao = ${id} order by curso.nome`
    connection.query(sql, (error, instituicoes)=>{
        if(error) throw error
        res.render('./Admin/verInstituicao', {instituicoes})
    })
}


///// ----> ADICIONAR UMA NOVA INSTITUICAO ✅
exports.cadastrarInst = async(req, res) => {
    
    req.session.loggedin = true
    req.session.user_Name
    const {nomeInstituicao, sigla_acronomo, tipo, provincia, telefone, endereco, telefone2, site} = req.body;
    sql = `insert into instituicao values(null, '${nomeInstituicao}', '${sigla_acronomo}', '${tipo}', '${endereco}', '${site}', '${telefone}', ${provincia})`
    await connection.query(sql, (error, results)=> {
        if (error) throw error
        res.redirect('/instit')
    }) 
}
///// ----> EDITAR UMA INSTITUICAO EM PARTICULAR ✅
exports.editarInst = async(req, res)=>{
    const {id} = req.params
    sql1 = `select *from instituicao inner join provincia on instituicao.idProvincia = provincia.id where instituicao.idInstituicao = ${id}`
    sql2 = `select *from provincia`
    connection.query(sql1, (error, instituicao)=> {
        if (error) throw error
        connection.query(sql2, (error, provincias)=> {
            if (error) throw error
            res.render('./Admin/pages/editarInstituicao', {instituicao, provincias, nome: nomeUs})
        })
    })
}
///// ----> CONFIRMAR EDICAO DE INSTITUICAO ✅
exports.admSaveedit_Inst = async(req, res)=> { 
   req.session.loggedin = true
   var  {nomeInstituicao, sigla_acronomo, tipo, provincia, telefone, endereco, site, idInstituicao} = req.body
   sql = `update instituicao set nomeInstituicao = '${nomeInstituicao}', sigla_acronomo = '${sigla_acronomo}', tipo = '${tipo}', endereco = '${endereco}', site_oficial = '${site}', telefone1 = '${telefone}', idProvincia = ${provincia} where idInstituicao = ${idInstituicao}`
   await connection.query(sql, (error, result)=> {
        if(error) throw error
        res.redirect('/instit')
   })
}
//

///// ----> EXCLUIR UMA INSTITUICAO ✅
exports.adm_eliminar_inst = async(req, res)=>{
    req.session.loggedin = true
    const {id} = req.params
    sql = `delete from instituicao where idInstituicao = ${id}`
    await connection.query(sql, (error, result)=>{
        if(error) throw error
        res.redirect('/instit')
    })
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// ADMIN GESTAO DE CURSOS  - CRUD ✅   ////////////////


///// ----> ADICIONAR UMA NOVO CURSO ✅
exports.adm_addcurso_inst = async(req, res)=> {
    const {id} = req.params
    connection.query(`SELECT *FROM instituicao WHERE idInstituicao = ${id}`, (error, resultado)=>{
        connection.query(`SELECT *FROM curso WHERE idInstituicao = ${id} order by nome`, (error, result)=>{
            if(error) throw error
            res.render('./Admin/pages/cursos', {cursos: result, instituicao: resultado, nome: nomeUs})
        })
    })
}

///// ----> CONFIRMAR CADASTRO DE CURSO ✅

// Defina uma variável para armazenar o caminho do arquivo
var filePath = null;

// Verifica se a pasta já foi criada
fs.stat('./public/uploads', function(err, stats) {
  if (err) {
    // Cria a pasta se ela não existir
    fs.mkdir('./public/uploads', function(err) {
      if (err) {
        console.log(err.stack);
      } else {
        console.log('Pasta "uploads" criada com sucesso.');
      }
    });
  } else { 
    console.log('Pasta "uploads" já existe.');
  }
});

var fileName = null; 

// ...

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    var ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
    fileName = file.fieldname + '-' + gerarCodigoAleatorio() + ext;
    var filePath = './public/uploads/' + fileName;
    callback(null, fileName);
  }
}); 

exports.admCadastrarCurso = async(req, res) => {
    req.session.loggedin = true
    var upload = multer({ storage: storage }).single('userFile');
    upload(req, res, function(err) {
        if (err) {
            return res.end("Erro ao fazer upload do arquivo.");
        }
        const {id, curso, duracao} = req.body
        console.log(curso);
        sql = `insert into curso values(null, '${curso}', ${duracao}, '${fileName}', ${id})`
        connection.query(sql, (error, resultado)=>{
            if(error) throw error
            connection.query(`SELECT *FROM instituicao WHERE idInstituicao = ${id}`, (error, resultado)=>{
                if(error) throw error
                connection.query(`SELECT *FROM curso WHERE idInstituicao = ${id} order by nome`, (error, result)=>{
                    if(error) throw error
                    res.render('./Admin/pages/cursos', {cursos: result, instituicao: resultado, nome: nomeUs})
                })
            })
        })    
    })    
}





exports.adm_ver_curso = async(req, res) => {
    req.session.loggedin = true
    const {idCurso, idInstituicao} = req.body
    sql = `select *from curso right join instituicao on curso.idInstituicao = instituicao.idInstituicao inner join provincia on instituicao.idProvincia = provincia.id  where instituicao.idInstituicao = ${idInstituicao} AND idCurso=${idCurso}`
    connection.query(sql, (error, instituicoes)=>{
        if(error) throw error
        res.render('./Admin/adm_ver_curso', {instituicoes})
    })
}


///// ----> EXCLUIR CURSO ✅
exports.adm_eliminar_curso = async(req, res) => {
    req.session.loggedin = true
    const {id, idI} = req.params
    console.log(idI)
    sql = `delete from curso where idCurso = ${id}`
    connection.query(sql, (error, result)=> {
        if(error) throw error
        connection.query(`SELECT *FROM instituicao WHERE idInstituicao = ${idI}`, (error, resultado)=>{
            if(error) throw error
            connection.query(`SELECT *FROM curso WHERE idInstituicao = ${idI} order by nome`, (error, result)=>{
                if(error) throw error
                res.render('./Admin/pages/cursos', {cursos: result, instituicao: resultado, nome: nomeUs})
            })
        })
    })
}


///// ----> EDITAR CURSO ✅
exports.adm_edit_curso = async(req, res) => {
    req.session.loggedin = true
    const {id, idI} = req.params
    console.log(idI)
    sql = `select *from curso inner join instituicao on curso.idInstituicao = instituicao.idInstituicao where curso.idCurso = ${id} and instituicao.idInstituicao = ${idI}`
    connection.query(sql, (error, instituicao)=>{
        if(error) throw error
        res.render('./Admin/pages/editarCurso', {instituicao, nome: nomeUs})
    })
}

///// ----> CONFIRMAR EDICACAO DO CURSO ✅
exports.admUpdateCurso = async(req, res) =>{
    req.session.loggedin = true
    var upload = multer({ storage: storage }).single('userFile');
    upload(req, res, function(err) {
        if (err) {
            return res.end("Erro ao fazer upload do arquivo.");
        }
        var {idInstituicao, idCurso, curso, duracao} = req.body
        sql = `update curso set nome = '${curso}', duracao = ${duracao} where idCurso = ${idCurso}`
        connection.query(sql, (error, results)=>{ 
            if(error) throw error
            connection.query(`SELECT *FROM instituicao WHERE idInstituicao = ${idInstituicao}`, (error, resultado)=>{
                if(error) throw error
                connection.query(`SELECT *FROM curso WHERE idInstituicao = ${idInstituicao} order by nome`, (error, result)=>{
                    if(error) throw error
                    res.render('./Admin/pages/cursos', {cursos: result, instituicao: resultado, nome: nomeUs})
                })
            })
        })
    })    
}




///// ----> CONFIRMAR EDICACAO DO CURSO ✅



exports.admUpdateCurso_grade = async(req, res) =>{
   // req.session.loggedin = true
    var upload = multer({ storage: storage }).single('userFile');
    upload(req, res, function(err) {
        if (err) {
            return res.end("Erro ao fazer upload do arquivo.");
        }
        var {idInstituicao, idCurso} = req.body
        console.log(fileName)
        sql1 = `update curso set gradeCurricular = '${fileName}' where idCurso = ${idCurso}`;
        connection.query(sql1, (error, results)=>{ 
            connection.query(`SELECT *FROM instituicao WHERE idInstituicao = ${idInstituicao}`, (error, resultado)=>{
                connection.query(`SELECT *FROM curso WHERE idInstituicao = ${idInstituicao} order by nome`, (error, result)=>{
                    if(error) throw error
                    res.render('./Admin/pages/cursos', {cursos: result, instituicao: resultado, nome: nomeUs})
                })
            })
        })
    })    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// GESTAO DA BIBLIOTECA ADMIN ✅



////// ---> LISTAR MATERIAIS ✅
exports.adm_biblioteca = async(req, res)=>{
    req.session.loggedin = true
    sql = `select *from material_didactico inner join categoria ON material_didactico.idCategoria = categoria.id`
    sql2 = `SELECT COUNT(titulo) AS total FROM material_didactico`
    sql3 = `SELECT *FROM categoria`
    connection.query(sql2, (error, totallivros)=> {
        connection.query(sql, (error, livros)=> {
            connection.query(sql3, (error, categorias)=> {
                if(error) throw error
                res.render('./Admin/pages/livros', {livros, total: totallivros[0].total, categorias, nome: nomeUs})
            })
        })
        
    })
}


exports.categorias = async(req, res) => {
    req.session.loggedin = true
    sql = `SELECT *FROM categoria`
    connection.query(sql, (error, categorias)=> {
        if(error) throw error
        res.render('./Admin/pages/categorias', {categorias, nome: nomeUs})
    })
}

exports.cadastrarCategoria = async(req, res) => {
    req.session.loggedin = true
    var {nome} = req.body
    sql = `INSERT INTO categoria VALUES(NULL, '${nome}')`
    connection.query(sql, (error, categorias)=> {
        if(error) throw error
        res.redirect('/categorias')
    })
}

exports.eliminarCategoria = async(req, res) => {
    req.session.loggedin = true
    var {id} = req.params
    sql = `DELETE FROM categoria WHERE id = ${id}`
    connection.query(sql, (error, categorias)=> {
        if(error) throw error
        res.redirect('/adm_biblioteca')
    })
}

exports.editarCategoria = async(req, res) => {
    req.session.loggedin = true
    var {id} = req.params
    sql = `SELECT *FROM categoria WHERE id = ${id}`
    connection.query(sql, (error, categoria)=> {
        if(error) throw error
        res.render('./Admin/pages/editarCategorias', {categoria, nome:nomeUs})
    })
}

exports.confirmUpdateCat = async(req, res) => {
    req.session.loggedin = true
    var {id, nome} = req.body
    sql = `UPDATE categoria SET nome = '${nome}' WHERE id = ${id}`
    sql2 = 'SELECT *FROM categoria'
    connection.query(sql, (error, categoria)=> {
        if(error) throw error
        connection.query(sql2, (error, categoria)=> {
            if(error) throw error
            res.redirect('/categorias')
        })
    })
}


////// ---> EXCLUIR LIVROS ✅
exports.adm_elim_livro = async(req, res)=>{
    req.session.loggedin = true
    const {id} = req.params
    sql = `delete from material_didactico where idMaterial = ${id}`
    connection.query(sql, (error, result)=>{
            if(error) throw error
            res.redirect('/adm_biblioteca')
    })
}

////// ---> EDITAR MATERIAL ✅
exports.adm_edit_livro = async(req, res)=> {
    req.session.loggedin = true
    const {id} = req.params
    sql = `select *from material_didactico where idMaterial = ${id}`
    sql2 = `SELECT *FROM categoria`
    connection.query(sql, (error, livro)=> {
        connection.query(sql2, (error, categorias)=> {
            if(error) throw error
            //editarLivro.ejs
            res.render('./Admin/pages/editarLivro', {livro, categorias, nome: nomeUs})
        })
    })
}




////// ---> CONFIRMAR EDICAO DO MATERIAL ✅
exports.adm_update_livro = async(req, res)=> {
    req.session.loggedin = true
    var upload = multer({ storage: storage }).single('userFile');
    upload(req, res, function(err) {
        if (err) {
            return res.end("Erro ao fazer upload do arquivo.");
        }
        var {titulo_altern, titulo, autor_altern, autor, idLivro, categoria} = req.body
        
        if(titulo == ''){
            titulo = titulo_altern
        }
        sql1 = `update material_didactico set titulo = '${titulo}', autor = '${autor}', idCategoria = ${categoria} where idMaterial = ${idLivro}`
        connection.query(sql1, (error, result)=> {
            if(error) throw error
            res.redirect('/adm_biblioteca') 
        })
    })    
}



exports.adm_update_livro_pdf = async(req, res)=> {
    req.session.loggedin = true
    var upload = multer({ storage: storage }).single('userFile');
    upload(req, res, function(err) {
        if (err) {
            return res.end("Erro ao fazer upload do arquivo.");
        }
        var {idLivro} = req.body
        sql1 = `update material_didactico set caminho = '${fileName}' where idMaterial = ${idLivro}`
        connection.query(sql1, (error, result)=> {
            if(error) throw error
            res.redirect('/adm_biblioteca')
        })
    })    
}


////// ---> ADICIONAR LIVRO ✅ adm_add_livro
exports.adm_add_livro = async(req, res)=> {
    req.session.loggedin = true
    //fileName
    var upload = multer({ storage: storage }).single('userFile');
    upload(req, res, function(err) {
        if (err) {
            return res.end("Erro ao fazer upload do arquivo.");
        }
        const {titulo, autor, categoria} = req.body
        sql = `insert into material_didactico values(null, '${titulo}', '${autor}', '${fileName}', curdate(),${categoria})`
        connection.query(sql, (error, result)=> {
            if(error) throw error
            res.redirect('/adm_biblioteca')
        })
    })
}


 

exports.admverLivro = async(req, res)=> {
    req.session.loggedin = true
    const {idLivro} = req.body
    sql = `SELECT *from material_didactico WHERE idMaterial=${idLivro}`
        connection.query(sql, (error, result)=> {
            if(error) throw error
            //res.send(idLivro)
            res.render('./Admin/admverLivro', {livro: result})
        })
}



