const { Router } = require("express");
const userRouter = Router();
const { hashPass, comparePass, updatePass, tokenCheck } = require("../middleware");
const { createUser, login, getAllUsers, readUser, updateUser, deleteUser } = require("./controllers");

userRouter.post("/user", hashPass, createUser);
userRouter.get("/user", getAllUsers);          
userRouter.patch("/user", updatePass, updateUser);      
userRouter.delete("/user", deleteUser);      

userRouter.post("/login", comparePass, login);      
userRouter.get("/login", tokenCheck, login);    

module.exports = userRouter;