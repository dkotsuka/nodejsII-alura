const { validationResult } = require('express-validator/check');

const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

const templates = require('../views/templates')

class LivroControlador {

    static rotas() {
        return {
            autenticadas: '/livros*',
            lista: '/livros',
            formulario: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id'
        }
    }

    lista() {
        return function(req, resp) {

            const livroDao = new LivroDao(db);
            livroDao.lista()
                    .then(livros => resp.marko(
                        templates.livros.lista,
                        {
                            livros: livros
                        }
                    ))
                    .catch(erro => console.log(erro));
        }
    }

    formulario() {
        return function(req, resp) {
            resp.marko(templates.livros.formulario, { livro: {} });
        }
    }

    recuperar() {
        return function(req, resp) {
            const id = req.params.id;
            const livroDao = new LivroDao(db);
    
            livroDao.buscaPorId(id)
                    .then(livro => 
                        resp.marko(
                            templates.livros.formulario, 
                            { livro: livro }
                        )
                    )
                    .catch(erro => console.log(erro));
        } 
    }

    cadastrar() {
        return function(req, resp) {
            const livroDao = new LivroDao(db);
    
            const erros = validationResult(req)
    
            if(!erros.isEmpty()){
                return resp.marko(
                    templates.livros.formulario,
                    {
                        livro: req.body,
                        errosValidacao: erros.array()
                    }
                )
            }
            
            livroDao.adiciona(req.body)
                    .then(resp.redirect(LivroControlador.rotas().lista))
                    .catch(erro => console.log(erro));
        }
    }

    atualiza(){
        return function(req, resp) {
            const livroDao = new LivroDao(db);
            
            livroDao.atualiza(req.body)
                    .then(resp.redirect(LivroControlador.rotas().lista))
                    .catch(erro => console.log(erro));
        }
    }

    remover(){
        return function(req, resp) {
            const id = req.params.id;
    
            const livroDao = new LivroDao(db);
            livroDao.remove(id)
                    .then(() => resp.status(200).end())
                    .catch(erro => console.log(erro));
        }
    }
}

module.exports = LivroControlador