import express from 'express';
import { getGallery } from '../controllers/GalleryController.js';

const router = express.Router();

router.get('/', getGallery);

export default router;
