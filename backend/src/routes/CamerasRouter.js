import express from "express";
import CamerasController from "../controllers/CamerasController.js"

const CamerasRouter = express.Router();

CamerasRouter.get("/", CamerasController.getAllCameras);
CamerasRouter.post("/", CamerasController.createCamera);
CamerasRouter.put("/:id", CamerasController.editCamera);
CamerasRouter.delete("/:id", CamerasController.deleteCamera);

export default CamerasRouter;
