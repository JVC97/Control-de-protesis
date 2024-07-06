const { Router } = require("express");
const {
  AuthMiddleware,
  ParseIntMiddleware,
  CacheMiddleware
} = require("../middlewares");
const { CACHE_TIME } = require("../helpers");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = function({ UserController }) {
  const router = Router();

  router.get("/lista", AuthMiddleware, UserController.getAll);
  router.get("/:userId", UserController.get);
  router.patch("/update", AuthMiddleware, UserController.update);
  router.post("/delete", AuthMiddleware, UserController.delete);

  return router;
};
