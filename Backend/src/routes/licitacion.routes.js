const { Router } = require("express");
const { ParseIntMiddleware, AuthMiddleware } = require("../middlewares");
const { LicitacionController } = require("../controllers");

module.exports = function({LicitacionController}) {
  const router = Router();

  router.get("/getall", [ParseIntMiddleware] ,LicitacionController.getAll);
  router.get("/porasignar",  [ParseIntMiddleware],LicitacionController.getPorAsignar);
  router.get("/codigo/:codigo", LicitacionController.getByNom);
  router.get("/:_id", LicitacionController.get);
  router.post("/createlicitacion", AuthMiddleware,LicitacionController.createLicitacion);
  router.patch("/update", AuthMiddleware, LicitacionController.update);
  router.post("/delete", AuthMiddleware, LicitacionController.delete);

  return router;
};