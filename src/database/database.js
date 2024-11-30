const mysql = require('mysql')
const databaseName = 'dblongoka'
const userName = 'root'
const hostName = 'localhost'
const dialectName = 'mysql'
const password = ''

//conexão com a base de dados
const servidor = "localhost";
const user = "root";
const nomedb = "dblongoka"
const senha = ""
const connection = mysql.createConnection({   
    host: servidor,
    user: user,
    password: senha,      
    database: nomedb
}) 



module.exports = connection;