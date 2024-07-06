const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("express-async-errors");
const { NotFoundMiddleware, ErrorMiddleware } = require("../middlewares");
const swaggerUI = require("swagger-ui-express");
const { SWAGGER_PATH } = require("../config");
const swaggerDocument = require(SWAGGER_PATH);

module.exports = function({
  HomeRoutes,
  UserRoutes,
  PacienteRoutes,
  ProtesisRoutes,
  VisitaRoutes,
  AuthRoutes,
  OrdenCompraRoutes,
  FacturaRoutes,
  LicitacionRoutes
}) {
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes
    .use(express.json())
    .use(cors())
    .use(helmet())
    .use(compression());

  apiRoutes.use("/home", HomeRoutes);
  apiRoutes.use("/user", UserRoutes);
  apiRoutes.use("/paciente", PacienteRoutes);
  apiRoutes.use("/protesis", ProtesisRoutes);
  apiRoutes.use("/visita", VisitaRoutes);
  apiRoutes.use("/auth", AuthRoutes);
  apiRoutes.use("/ordencompra", OrdenCompraRoutes);
  apiRoutes.use("/factura", FacturaRoutes);
  apiRoutes.use("/licitacion", LicitacionRoutes);

  router.use("/v1/api", apiRoutes);
  router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
