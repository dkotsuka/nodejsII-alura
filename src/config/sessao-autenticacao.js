const uuid = require('uuid/v4')
const sessao = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UsuarioDao = require('../app/infra/usuario-dao')
const db = require('../config/database');

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
                    console.log("usuário: ", usuario)
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

    passport.serializeUser((usuario, done) => {
        const usuarioSessao = {
            nome: usuario.nome_completo,
            email: usuario.email
        }
        done(null, usuarioSessao)
    })

    passport.deserializeUser((usuarioSessao, done) => {
        done(null, usuarioSessao)
    })

    app.use(sessao({
        secret: 'node alura',
        genid: () => uuid(),
        saveUninitialized: false,
        resave: false
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    app.use(function (req, resp, next){
        req.passport = passport
        next()
    })
}