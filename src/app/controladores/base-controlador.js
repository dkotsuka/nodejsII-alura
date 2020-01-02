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
        return function (req, res) {
            resp.marko(templates.base.login)
        }
    }

    efetuaLogin() {
        return function (req, res) {
            
        }
    }
}

module.exports = BaseControlador