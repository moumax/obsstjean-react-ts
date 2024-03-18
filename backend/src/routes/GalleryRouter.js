import express from "express";
import GalleryController from "../controllers/GalleryController.js";

const router = express.Router();

router.get("/", GalleryController.getAllGalleries);

export default router;
