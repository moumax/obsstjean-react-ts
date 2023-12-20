import express from "express";
import UsersController from "../controllers/UsersController.js";

const usersRouter = express.Router();

usersRouter.get("/", UsersController.getAllUsers);
usersRouter.post("/", UsersController.createUser);
usersRouter.put("/:id", UsersController.editUser);
usersRouter.delete("/:id", UsersController.deleteUser);

export default usersRouter;
