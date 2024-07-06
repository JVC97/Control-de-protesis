const { Router } = require("express");
const { ParseIntMiddleware, AuthMiddleware } = require("../middlewares");
const { OrdenCompraController } = require("../controllers");

module.exports = function({ OrdenCompraController }) {
  const router = Router();

  router.get("/getall", AuthMiddleware,[ParseIntMiddleware], OrdenCompraController.getAll);
  router.get("/porasignar",  [ParseIntMiddleware],OrdenCompraController.getPorAsignar);
  router.get("/codigo/:codigo", OrdenCompraController.getByNom);
  router.get("/:_id", OrdenCompraController.get);
  router.post("/createordencompra", OrdenCompraController.createordenCompra);
  router.patch("/update", AuthMiddleware, OrdenCompraController.update);
  router.post("/delete", AuthMiddleware, OrdenCompraController.delete);

  return router;
};