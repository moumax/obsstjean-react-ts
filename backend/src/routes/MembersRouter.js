import express from "express";
import MembersController from "../controllers/MembersController.js";

const membersRouter = express.Router();

membersRouter.get("/", MembersController.getAllMembers);
membersRouter.post("/", MembersController.createMember);
membersRouter.put("/:id", MembersController.editMember);
membersRouter.delete("/:id", MembersController.deleteMember);

export default membersRouter;
