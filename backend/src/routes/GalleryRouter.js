import express from 'express';
import GalleryController from '../controllers/GalleryController.js';

const router = express.Router();

router.get('/', GalleryController.getAllGallery);
router.get('/:username', GalleryController.getOneGallery);

export default router;
