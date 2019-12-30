const templates = require('../views/templates')

class BaseControlador {

    static rotas() {
        return {
            main: '/'
        }
    }
    
    main() {
        return function(req, resp) {
            resp.marko(
                templates.base.main
            );
        }
    }
}

module.exports = BaseControlador