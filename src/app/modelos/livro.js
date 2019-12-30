const { check } = require('express-validator/check');

class Livro {
    static validacoes(){
        return [
            check('titulo').isLength({min: 5}).withMessage("O título deve ter pelo menos 5 caracteres."),
            check('preco').isCurrency().withMessage("O preço deve ter formato monetário válido!")
        ]
    }
}

module.exports = Livro