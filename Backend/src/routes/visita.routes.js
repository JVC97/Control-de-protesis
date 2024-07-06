const { Router } = require("express");
const { AuthMiddleware } = require("../middlewares");

module.exports = function({ VisitaController }) {
  const router = Router();

  router.get("/get", VisitaController.get);
  router.get("/protesis", VisitaController.getVisitaByProtesis);
  router.post("/createvisita", VisitaController.createVisita);
  router.patch("/update", AuthMiddleware, VisitaController.update);
  router.post("/delete", AuthMiddleware, VisitaController.delete);

  return router;
};
