const {createContainer, asClass, asValue, asFunction} = require("awilix");

//config
const config = require("../config");
const app = require(".");

//Services
const {} = require("../services");

//Controllers
const {} = require("../controllers");

//Routes
const {} = require("../routes/index.routes");
const Routes = require("../routes");

//Models
const { 
    User,
    Paciente,
    Protesis,
    Visita,
    OrdenCompra,
    Factura,
    Licitacion
} = require("../models");

//Repostories
const {
    UserRespository,
    PacienteRepository,
    Protesisrepostory,
    VisitaRepository,
    OrdenCompraRepository,
    FacturaRepository,
    LicitacionRepository
} = require("../repositories");

const container = createContainer();

container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    })
    .register({
        User: asValue(User),
        Paciente: asValue(Paciente),
        Protesis: asValue(Protesis),
        Visita: asValue(Visita),
        OrdenCompra: asValue(OrdenCompra),
        Factura: asValue(Factura),
        Licitacion: asValue(Licitacion)
    })
    .register({
        UserRespository: asClass(UserRespository).singleton(),
        PacienteRepository: asClass(PacienteRepository).singleton(),
        Protesisrepostory: asClass(Protesisrepostory).singleton(),
        VisitaRepository: asClass(VisitaRepository).singleton(),
        OrdenCompraRepository: asClass(OrdenCompraRepository).singleton(),
        FacturaRepository: asClass(FacturaRepository).singleton(),
        LicitacionRepository: asClass(LicitacionRepository).singleton()
    });

module.exports = container;