const { Router } = require("express");
const { ParseIntMiddleware, AuthMiddleware } = require("../middlewares");

module.exports = function({ ProtesisController }) {
  const router = Router();

  router.get("/getall", [ParseIntMiddleware], ProtesisController.getAll);
  router.get("/get", ProtesisController.get);
  router.get("/porfacturar", [ParseIntMiddleware], ProtesisController.getPorFacturar);
  router.get("/rut", ProtesisController.getPacienteProtesis);
  router.post("/ordencompra", ProtesisController.ordenCompra);
  router.post("/eliminarorden", ProtesisController.eliminarOrdenCompra);
  router.post("/eliminarlicitacion", ProtesisController.eliminarLicitacion);
  router.post("/eliminarfactura", ProtesisController.eliminarFactura);
  router.post("/licitacion", ProtesisController.licitacion);
  router.post("/factura", ProtesisController.factura);
  router.post("/createprotesis", ProtesisController.createProtesis);
  router.patch("/update", AuthMiddleware, ProtesisController.update);
  router.post("/delete", AuthMiddleware, ProtesisController.delete);


  return router;
};
