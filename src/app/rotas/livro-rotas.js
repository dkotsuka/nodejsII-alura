const LivroControlador = require('../controladores/livro-controlador')
const livroControlador = new LivroControlador

const BaseControlador = require('../controladores/base-controlador')

const Livro = require('../modelos/livro')

module.exports = (app) => {

    const livroRotas = LivroControlador.rotas()

    app.use(livroRotas.autenticadas, function (req, resp, next) {
        if (req.isAuthenticated()){
            next()
        } else {
            resp.redirect(BaseControlador.rotas().login)
        }
    })
    
    app.get(livroRotas.lista, livroControlador.lista());

    app.route(livroRotas.formulario)
        .get(livroControlador.formulario())
        .post(Livro.validacoes(), livroControlador.cadastrar())
        .put(livroControlador.atualiza());

    app.get(livroRotas.edicao, livroControlador.recuperar());

    app.delete(livroRotas.delecao, livroControlador.remover());
};