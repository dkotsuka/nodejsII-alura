const LivroControlador = require('./livro-controlador')
const templates = require('../views/templates')

class BaseControlador {

    static rotas() {
        return {
            main: '/',
            login: '/login'
        }
    }
    
    main() {
        return function(req, resp) {
            resp.marko(templates.base.main);
        }
    }

    login() {
        return function (req, resp) {
            resp.marko(templates.base.login)
        }
    }

    efetuaLogin() {
        return function (req, resp, next) {
            const passport = req.passport
            passport.authenticate('local', (erro, usuario, info) => {
                if(info) {
                    resp.marko(templates.base.login)
                }
                if(erro) {
                    next(erro)
                }

                req.login(usuario, (erro) => {
                    if(erro) {
                        return next(erro)
                    }
                    return resp.redirect(LivroControlador.rotas().lista)
                })
            })(req,resp,next)
        }
    }
}

module.exports = BaseControlador