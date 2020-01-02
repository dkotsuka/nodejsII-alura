const BaseControlador = require('../controladores/base-controlador')
const baseControlador = new BaseControlador

module.exports = (app) => {
    const baseRotas = BaseControlador.rotas()
    app.get(baseRotas.main, baseControlador.main());

    app.route(baseRotas.login)
        .get(baseControlador.login())
        .post(baseControlador.efetuaLogin())
}