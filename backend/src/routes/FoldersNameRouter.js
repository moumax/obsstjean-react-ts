import express from 'express';
import FoldersNameController from '../controllers/FoldersNameController.js';

const router = express.Router();

router.get('/', FoldersNameController.getAllFoldersName);

export default router;
