const mysql = require('mysql')
const databaseName = 'bekl6qvpd2luujkhs01y'
const userName = 'ucqngic5mahmxqdn'
const hostName = 'bekl6qvpd2luujkhs01y-mysql.services.clever-cloud.com'
const dialectName = 'mysql'
const password = 'QkFylsq5gPhzihPgn6Bf'

//conexão com a base de dados
const servidor = "bekl6qvpd2luujkhs01y-mysql.services.clever-cloud.com";
const user = "ucqngic5mahmxqdn";
const nomedb = "bekl6qvpd2luujkhs01y"
const senha = "QkFylsq5gPhzihPgn6Bf"
const connection = mysql.createConnection({   
    host: servidor,
    user: user,
    password: senha,      
    database: nomedb
}) 



module.exports = connection;
