const uuid = require('uuid/v4')
const sessao = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UsuarioDao = require('../app/infra/usuario-dao')

module.exports = (app) => {

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha'
        },
        (email, senha, done) => {
            const usuarioDao = new UsuarioDao(db)
            usuarioDao.buscaPorEmail(email)
                .then(usuario => {
                    if(!usuario || senha != usuario.senha){
                        return done(null, false, {
                            message: 'Usuário inexistente ou senha incorreta.'
                        })
                    }

                    return done(null, usuario)
                })
                .catch(error => done(error, false))
        }
    ))

}