const { Router } = require("express");
const { ParseIntMiddleware, AuthMiddleware } = require("../middlewares");
const { FacturaController } = require("../controllers");

module.exports = function({ FacturaController }) {
  const router = Router();

  router.get("/lista",  FacturaController.getAll);
  router.get("/pagadas", FacturaController.getPagada);
  router.get("/codigo/:codigo", FacturaController.getByNom);
  router.get("/porpagar", FacturaController.getPorPagar);
  router.get("/:_id",  FacturaController.get);
  router.get("/getfactura", FacturaController.get);
  router.post("/createfactura", FacturaController.createFactura);
  router.patch("/update", AuthMiddleware, FacturaController.update);
  router.post("/delete",  FacturaController.delete);

  return router;
};