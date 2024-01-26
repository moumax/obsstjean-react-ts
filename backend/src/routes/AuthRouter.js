import express from "express";
import AuthController from "../controllers/AuthController.js";

const authRouter = express.Router();

authRouter.post("/login", AuthController.login);
authRouter.get("/logout", AuthController.logout);

export default authRouter;
