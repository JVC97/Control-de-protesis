const { createContainer, asClass, asValue, asFunction } = require("awilix");

//  config
const config = require("../config");
const app = require(".");

// services
const {
  HomeService,
  UserService,
  PacienteService,
  ProtesisService,
  VisitaService,
  AuthService,
  OrdenCompraService,
  FacturaService,
  LicitacionService
} = require("../services");

// controllers
const {
  HomeController,
  UserController,
  PacienteController,
  ProtesisController,
  VisitaController,
  AuthController,
  OrdenCompraController,
  FacturaController,
  LicitacionController
} = require("../controllers");

// routes
const {
  HomeRoutes,
  UserRoutes,
  PacienteRoutes,
  ProtesisRoutes,
  VisitaRoutes,
  AuthRoutes,
  OrdenCompraRoutes,
  FacturaRoutes,
  LicitacionRoutes
} = require("../routes/index.routes");
const Routes = require("../routes");

// models
const { User, Paciente, Protesis,Visita, OrdenCompra, Factura, Licitacion } = require("../models");

// repositories
const {
  UserRepository,
  PacienteRepository,
  ProtesisRepository,
  VisitaRepository,
  OrdenCompraRepository,
  FacturaRepository,
  LicitacionRepository
} = require("../repositories");
const OrdenCompraControllers = require("../controllers/ordenCompra.controller");

const container = createContainer();

container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config)
  })
  .register({
    HomeService: asClass(HomeService).singleton(),
    UserService: asClass(UserService).singleton(),
    PacienteService: asClass(PacienteService).singleton(),
    ProtesisService: asClass(ProtesisService).singleton(),
    VisitaService: asClass(VisitaService).singleton(),
    AuthService: asClass(AuthService).singleton(),
    OrdenCompraService: asClass(OrdenCompraService).singleton(),
    FacturaService: asClass(FacturaService).singleton(),
    LicitacionService: asClass(LicitacionService).singleton()
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
    PacienteController: asClass(PacienteController.bind(PacienteController)).singleton(),
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
    ProtesisController: asClass(ProtesisController.bind(ProtesisController)).singleton(),
    VisitaController: asClass(VisitaController.bind(VisitaController)).singleton(),
    OrdenCompraController: asClass(OrdenCompraControllers.bind(OrdenCompraController)).singleton(),
    FacturaController: asClass(FacturaController.bind(FacturaController)).singleton(),
    LicitacionController: asClass(LicitacionController.bind(LicitacionController)).singleton()
  })
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    PacienteRoutes: asFunction(PacienteRoutes).singleton(),
    ProtesisRoutes: asFunction(ProtesisRoutes).singleton(),
    VisitaRoutes: asFunction(VisitaRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton(),
    OrdenCompraRoutes: asFunction(OrdenCompraRoutes).singleton(),
    FacturaRoutes: asFunction(FacturaRoutes).singleton(),
    LicitacionRoutes: asFunction(LicitacionRoutes).singleton()
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
    UserRepository: asClass(UserRepository).singleton(),
    PacienteRepository: asClass(PacienteRepository).singleton(),
    ProtesisRepository: asClass(ProtesisRepository).singleton(),
    VisitaRepository: asClass(VisitaRepository).singleton(),
    OrdenCompraRepository: asClass(OrdenCompraRepository).singleton(),
    FacturaRepository: asClass(FacturaRepository).singleton(),
    LicitacionRepository: asClass(LicitacionRepository).singleton()
  });

module.exports = container;
