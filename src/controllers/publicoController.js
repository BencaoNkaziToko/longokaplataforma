////// AMBIENTE PUBLICO 

const connection = require('../database/database')
///// ---> PAGINA INICIAL✅
exports.publicoPage = async(req, res)=>{
    res.render('Publico/ensinosupeior_home')
}


exports.mukalassi_ensino_medio = async(req, res)=>{
    res.render('Publico/ensino_medio')
}
exports.mukalassi_ensino_tecnico_profissional = async(req, res)=>{
    res.render('Publico/ensino_tecnico')
}

exports.mukalassi_ensino_superior = async(req, res)=>{
    connection.query('SELECT DISTINCT nome FROM curso', (error, results)=> {
        connection.query('SELECT *FROM provincia', (error, provincias)=> {
            res.render('Publico/ensinosupeior_home', {provincias, results})
        })
    })
}

exports.homemenu = async(req, res)=>{
        res.redirect('Publico/mukalassi_ensino_superior')
}

exports.pesquisa = async(req, res) =>{
    connection.query('SELECT *FROM provincia', (error, provincia)=> {
        res.render('Publico/pesquisa', {provincias: provincia})
    })
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// ---> PESQUISAR DE INSTITUICOES ✅



//// ----> PESQUISAR POR NOME DA INSTTUICAO, CURSO, TIPO DE INSTTUICAO E PROVINCIA ✅
exports.pesquisaPublica = async(req, res)=>{
    const {tipo, curso, provincia} = req.body
    //consultas:
    if((tipo == "" && curso == "") && (provincia == "vazio" )) {
        res.send('Tudo vazio')
        //connection.query('')

    }
    //pesquisar uma instituicao pelo tipo apenas
        else if((tipo != "" && curso == "") && (provincia == "vazio" )){
            //res.send('PESQUISAR INSTITUICAO SOMENTE: '+nome)
            connection.query(`SELECT *FROM instituicao INNER JOIN provincia ON instituicao.idProvincia = provincia.id WHERE tipo LIKE '%${nome}%'`, (req, results)=>{
                if (err) {
                    res.sendStatus(500);
                    return;
                }
                res.json(results);
            })
        }

        else if((tipo != "" && curso == "") && (provincia != "vazio" )){
            res.send('PESQUISAR INSTITUICAO SOMENTE: '+tipo)
        }

        else if((tipo != "" && curso != "") && (provincia == "vazio" )){
            res.send('PESQUISAR INSTITUICAO SOMENTE: '+tipo)
        }
    // 

    //todas instituicoes do pais com o curso de Eng.Mecanica em todas as provincias, por ex.
        else if((tipo == "" && curso != "") && (provincia == "vazio" )){
            res.send('todas instituicoes de Angola com o curso: '+curso)
        }

    //todas instituicoes de Luanda(ex.) com o curso de Eng.Mecanica em todas as provincias, por ex.
        else if((tipo == "" && curso != "") && (provincia != "vazio" )){
            res.send('todas instituicoes de Angola com o curso: '+curso+"Provincia: "+provincia)
        }

}


exports.buscarDados = async(req, res)=>{
    var nomeCurso = req.query.nomeCurso;
    var provincia = req.query.provincia;
    var tipo = req.query.tipo;
    exports.getCurso = function (nome){
        return nomeCurso
    }
    

    //Ex: Todas instituções(Pub e Privadas) do país, sem discriminar um curso.
    if(nomeCurso == "" && provincia == "vazio"){
        if( tipo == "vazio"){
            sql1 = `SELECT distinct instituicao.nomeInstituicao, nomeProvincia as endereco, instituicao.sigla_acronomo, instituicao.tipo, provincia.nomeProvincia, instituicao.idInstituicao from instituicao join curso on instituicao.idInstituicao = curso.idInstituicao inner join provincia on instituicao.idProvincia = provincia.id order by nomeProvincia`
            connection.query(sql1, (error, results)=>{
                if(error) throw error
                res.json({data: results})
            })  
        }else if( tipo != "vazio"){
            sql1 = `SELECT distinct instituicao.nomeInstituicao, nomeProvincia as endereco, instituicao.sigla_acronomo, instituicao.tipo, provincia.nomeProvincia, instituicao.idInstituicao from instituicao join curso on instituicao.idInstituicao = curso.idInstituicao inner join provincia on instituicao.idProvincia = provincia.id where instituicao.tipo LIKE '%${tipo}%' order by nomeProvincia`
            connection.query(sql1, (error, results)=>{
                if(error) throw error 
                res.json({data: results})
            })  
        }
    //Ex: Todas inst(Pub e Priv) do país com o curso de Engenharia    
    }else if(nomeCurso != "" && provincia == "vazio"){
        if( tipo == "vazio"){
            sql1 = `SELECT distinct instituicao.nomeInstituicao, nomeProvincia as endereco,instituicao.sigla_acronomo, instituicao.tipo, provincia.nomeProvincia, instituicao.idInstituicao from instituicao join curso on instituicao.idInstituicao = curso.idInstituicao inner join provincia on instituicao.idProvincia = provincia.id where curso.nome like '%${nomeCurso}%' order by nomeProvincia`
            connection.query(sql1, (error, results)=>{
                if(error) throw error
                res.json({data: results})
            })  
        }else if( tipo != "vazio"){
            sql1 = `SELECT distinct instituicao.nomeInstituicao, instituicao.sigla_acronomo, nomeProvincia as endereco, instituicao.tipo, provincia.nomeProvincia, instituicao.idInstituicao from instituicao join curso on instituicao.idInstituicao = curso.idInstituicao inner join provincia on instituicao.idProvincia = provincia.id where curso.nome like '%${nomeCurso}%' and instituicao.tipo LIKE '%${tipo}%' order by nomeProvincia`
            connection.query(sql1, (error, results)=>{
                if(error) throw error
                res.json({data: results})
            })  
        }  
    }else if(nomeCurso == "" && provincia != "vazio"){
        if( tipo == "vazio"){
            sql1 = `SELECT distinct instituicao.nomeInstituicao, nomeProvincia as endereco, instituicao.sigla_acronomo, instituicao.tipo, provincia.nomeProvincia, instituicao.idInstituicao from instituicao join curso on instituicao.idInstituicao = curso.idInstituicao inner join provincia on instituicao.idProvincia = provincia.id where provincia.nomeProvincia LIKE '%${provincia}%' order by nomeProvincia`
            connection.query(sql1, (error, results)=>{
                if(error) throw error
                res.json({data: results})
            })  
        }else if( tipo != "vazio"){
            sql1 = `SELECT distinct instituicao.nomeInstituicao, nomeProvincia as endereco, instituicao.sigla_acronomo, instituicao.tipo, provincia.nomeProvincia, instituicao.idInstituicao from instituicao join curso on instituicao.idInstituicao = curso.idInstituicao inner join provincia on instituicao.idProvincia = provincia.id where provincia.nomeProvincia LIKE '%${provincia}%' and instituicao.tipo LIKE '%${tipo}%' order by nomeProvincia`
            connection.query(sql1, (error, results)=>{
                if(error) throw error
                res.json({data: results})
            })  
        }  
    }else if(nomeCurso != "" && provincia != "vazio"){
        if( tipo == "vazio"){
            sql1 = `SELECT distinct instituicao.nomeInstituicao, nomeProvincia as endereco, instituicao.sigla_acronomo, instituicao.tipo, provincia.nomeProvincia, instituicao.idInstituicao from instituicao join curso on instituicao.idInstituicao = curso.idInstituicao inner join provincia on instituicao.idProvincia = provincia.id where curso.nome like '%${nomeCurso}%' and provincia.nomeProvincia LIKE '%${provincia}%' order by nomeProvincia`
            connection.query(sql1, (error, results)=>{
                if(error) throw error 
                res.json({data: results})
            })  
        }else if( tipo != "vazio"){
            sql1 = `SELECT distinct instituicao.nomeInstituicao, nomeProvincia as endereco, instituicao.sigla_acronomo, instituicao.tipo, provincia.nomeProvincia, instituicao.idInstituicao from instituicao join curso on instituicao.idInstituicao = curso.idInstituicao inner join provincia on instituicao.idProvincia = provincia.id where curso.nome like '%${nomeCurso}%' and provincia.nomeProvincia LIKE '%${provincia}%' and instituicao.tipo LIKE '%${tipo}%' order by nomeProvincia`
            connection.query(sql1, (error, results)=>{
                if(error) throw error 
                res.json({data: results})
            })  
        }  
    }
}


exports.getFruits = async(req, res)=>{
    let payload = req.body.payload.trim();
    console.log(payload)
    let sql = `select *from instituicao inner join provincia on instituicao.idProvincia = provincia.id where instituicao.nomeInstituicao like '%${payload}%' or instituicao.sigla_acronomo like '%${payload}%'`;
    connection.query(sql, (error, results)=>{
        if (error) throw error;
        res.send({payload: results});// Envia os resultados como resposta JSON
    })

}  


/////  AMBIENTE PUBLICO
///// ---> BIBLIOTECA ❌
exports.livros = async(req, res)=> {
    let buscarLivros = `SELECT m.idMaterial, m.titulo, m.autor, m.caminho, m.dataCadastro, c.nome FROM material_didactico  m JOIN categoria c ON m.idCategoria = c.id`
    connection.query(buscarLivros, (error, result)=>{
        if (error) throw error;
            res.render('Publico/b', {livros: result})
    })  
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.orientacao = async(req, res) =>{
    res.render('Publico/orientacao')
}



    