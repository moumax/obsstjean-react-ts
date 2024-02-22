import express from "express";
import SkyObjectsController from "../controllers/SkyObjectsController.js";

const SkyObjectsRouter = express.Router();

SkyObjectsRouter.get("/", SkyObjectsController.getAllSkyObjects);

export default SkyObjectsRouter;
