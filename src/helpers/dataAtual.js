const dataAtual = new Date();
const ano = dataAtual.getFullYear();
const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); 
const dia = String(dataAtual.getDate()).padStart(2, '0');
const dataFormatada = `${ano}-${mes}-${dia}`;

module.exports = dataFormatada