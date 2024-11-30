const express = require('express')
const router = express.Router()
const publicoController = require('../controllers/publicoController')
console.log('LOADED ROUTE ----> publico')


// ---> PAGINA INICIAL ✅

router.get('/', publicoController.publicoPage)

router.get('/mukalassi_ensino_medio', publicoController.mukalassi_ensino_medio)
router.get('/mukalassi_ensino_tecnico_profissional', publicoController.mukalassi_ensino_tecnico_profissional)

// ---> PESQUISAS DE INSTITUICOES ✅
router.get('/mukalassi_ensino_superior', publicoController.mukalassi_ensino_superior)
router.post('/pesquisaPublica', publicoController.pesquisaPublica)
router.post('/getFruits', publicoController.getFruits)
router.get('/buscarDados', publicoController.buscarDados)
router.get('/livros', publicoController.livros)
router.get('/orientacao', publicoController.orientacao)
router.get('/pesquisa', publicoController.pesquisa)
router.get('/homemenu', publicoController.homemenu)

// ---> ORIENTACAO VOCAIONAL ❌



module.exports = router