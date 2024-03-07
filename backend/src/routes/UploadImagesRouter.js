import UploadImagesController from "../controllers/UploadImagesController.js";
import { Router } from "express";

const UploadImagesRouter = Router();

UploadImagesRouter.get("/", UploadImagesController.getAllImages);
UploadImagesRouter.post("/", UploadImagesController.uploadImage);

export default UploadImagesRouter;
