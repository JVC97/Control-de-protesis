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
const {} = require("../models");

//Repostories
const {} = require("../repositories");

const container = createContainer();

container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    });

module.exports = container;