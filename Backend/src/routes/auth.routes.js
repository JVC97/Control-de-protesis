const { Router } = require("express");

module.exports = function({ AuthController }) {
  const router = Router();

  router.post("/signup", AuthController.signUp);
  router.post("/signin", AuthController.signIn);
  router.patch("/recoverpassword", AuthController.recoverPassword);
  router.patch("/recuperapassword", AuthController.recuperaPassword);

  return router;
};
