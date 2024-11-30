//import node_modules
const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mysql = require('mysql')
const util = require('util');
var fs = require('fs')
const path = require("path");
const session = require("express-session")


const connection = require('./database/database')

const { exec } = require('child_process');


           
const { jsPDF } = require("jspdf");
const { error } = require("console");


const port = process.env.PORT || 8000      



//Verificação da conexão com a base de dados
connection.connect(function(error){
    if(!!error){ console.log("Warning: "+error)}
    else console.log("****  Database Connected successfuly  ****")
})
const query = util.promisify(connection.query).bind(connection);

//
app.use(session({
    secret: "QUALQUERCOISA",
    resave: true,
    saveUninitialized: true
}))



// Views
app.use(express.static('public'))
app.use(express.static('docs'))
/*
app.use('/assets', express.static(__dirname + 'public/assets'))
app.use('/assets2', express.static(__dirname + 'public/assets2'))
app.use('/vendor', express.static(__dirname + 'public/vendor'))

app.use('/assets2', express.static(__dirname + 'public/assets3'))
app.use('/vendor', express.static(__dirname + 'public/vendor3'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/uploads', express.static(__dirname + 'public/uploads'))
app.use('/gulp-tasks', express.static(__dirname + 'public/gulp-tasks'))
app.use('/node_modules', express.static(__dirname + 'public/node_modules'))
app.use('/fonts', express.static(__dirname + 'public/fonts'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/css', express.static(__dirname + 'public/css'))*/


app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: false})) 




//USANDO ROTAS DO SYSTEM
app.use('/', require('./routes/publicoRouter'))
app.use('/', require('./routes/adminRouter'))
app.use('/', require('./routes/perfilRoute')) 








app.get('*', (req, res)=>{
    res.render('./404/error-404')
})

//Servidor
const url = `http://localhost:${port}`;
exec(`start ${url}`);
app.listen(port, ()=>{
    
    console.log("API rodando na porta "+port);
}) 
               

          