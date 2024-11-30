const express = require('express')
const router = express.Router()
const admController = require('../controllers/admController')

function f_adminAuth(req, res, next) { 
    if(req.session.user != undefined){
        next()
    }else{
        res.render('./Admin/login')
    }
 }

console.log('LOADED ROUTE ----> admin')


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// ROTAS DO ADMINISTRATOR
// ----> LOGIN E LOGOUT ✅
router.get('/admLogin', admController.admLogin)
router.get('/admHome', admController.admHome)
router.post('/admAuth', admController.admAuth)
router.get('/logoutAdm', admController.logoutAdm)
router.get('/verificar', admController.verificar)
/////////////////////////////////////////////////////////////////////////
/*//*/ // ROTAS TEMPORARIAS ✅                                //////////
/*//*/    router.get('/admRegister', admController.adminRegister)    //
/*//*/    router.post('/cadAdm', admController.cadAdmin)            //
/////////////////////////////////////////////////////////////////////


// ----> GESTAO DE INSTITUICOES ✅
router.get('/adminstituicoes', admController.adminstituicoes)
router.post('/verInstituicao', admController.verInstituicao)
router.post('/cadastrarInst', admController.cadastrarInst)
router.get('/editarInst/:id', admController.editarInst)
router.get('/adm_eliminar_inst/:id', admController.adm_eliminar_inst)
router.post('/admSaveedit_Inst', admController.admSaveedit_Inst)

// ----> GESTAO DE CURSOS ✅
router.get('/adm_addcurso_inst/:id', admController.adm_addcurso_inst)
router.post('/admCadastrarCurso', admController.admCadastrarCurso)
router.get('/adm_eliminar_curso/:id/:idI', admController.adm_eliminar_curso)
router.get('/adm_edit_curso/:id/:idI', admController.adm_edit_curso)
router.post('/admUpdateCurso', admController.admUpdateCurso)
router.post('/admUpdateCurso_grade', admController.admUpdateCurso_grade)
router.post('/adm_ver_curso', admController.adm_ver_curso)
// ----> GESTAO DE BIBLIOTECA ✅


router.get('/adm_biblioteca', admController.adm_biblioteca)   
router.get('/categorias', admController.categorias) 
router.post('/cadastrarCategoria', admController.cadastrarCategoria) 
router.get('/eliminarCategoria/:id', admController.eliminarCategoria) 
router.get('/editarCategoria/:id', admController.editarCategoria) 
router.post('/confirmUpdateCat', admController.confirmUpdateCat)


router.get('/adm_elim_livro/:id', admController.adm_elim_livro)
router.post('/adm_add_livro', admController.adm_add_livro)
router.get('/adm_edit_livro/:id', admController.adm_edit_livro)
router.get('/instit', admController.instit)
router.post('/adm_update_livro', admController.adm_update_livro)
router.get('/admBiblioteca', admController.admBiblioteca)
router.post('/adm_update_livro_pdf', admController.adm_update_livro_pdf)
router.post('/admverLivro', admController.admverLivro)





module.exports = router;