const express = require("express");
const { registration, getAllUsers, deleteUser, userUpdate } = require("../controllers/user.controller");
const userRoute = express.Router();

userRoute.post("/register", registration);
userRoute.get("/", getAllUsers);
userRoute.delete("/", deleteUser);
userRoute.put("/", userUpdate)

module.exports =userRoute;