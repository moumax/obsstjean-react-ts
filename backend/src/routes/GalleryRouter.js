import express from "express";
import GalleryController from "../controllers/GalleryController.js";

const router = express.Router();

router.get("/", GalleryController.getAllGalleries);
router.get("/:owner", GalleryController.getOneGallery)
router.delete("/:id", GalleryController.delete)

export default router;
