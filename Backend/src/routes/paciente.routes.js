const { Router } = require("express");
const { ParseIntMiddleware, AuthMiddleware } = require("../middlewares");
const { PacienteController } = require("../controllers");

module.exports = function({ PacienteController }) {
  const router = Router();

  router.get("/listpaciente", [ParseIntMiddleware], PacienteController.getAll);
  router.get("/getpaciente", PacienteController.get);
  router.get("/nombre/:nombre", PacienteController.getByNom);
  router.post("/createpaciente", PacienteController.createPaciente);
  router.patch("/update", AuthMiddleware, PacienteController.update);
  router.post("/delete",  PacienteController.delete);

  return router;
};
