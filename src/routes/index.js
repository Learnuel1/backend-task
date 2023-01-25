const express = require("express");
const userRoute = require("./user.route");
routesRouter = express.Router();

routesRouter.use("/user", userRoute);
module.exports={
  routesRouter,
}