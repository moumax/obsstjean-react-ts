import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ImagesController from "../controllers/ImagesController.js";
import { Router } from "express";

const ImageRouter = Router();

// Récupérer le chemin du répertoire actuel
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

ImageRouter.get("/", ImagesController.getAllImages);
ImageRouter.post("/", ImagesController.uploadImage);

// ImageRouter.get("/gallery", (req, res) => {
//     const imagesDirectory = path.join(__dirname, '..', '..', 'uploads');
//     fs.readdir(imagesDirectory, (err, userFolders) => {
//         if (err) {
//             console.error('Error reading user folders:', err);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//         
//         const imageUrls = [];// Importez le module path
//
//         userFolders.forEach(userFolder => {
//             // Filter out hidden system files (like .DS_Store)
//             if (!userFolder.startsWith('.')) {
//                 const userFolderPath = path.join(imagesDirectory, userFolder);
//                 fs.readdirSync(userFolderPath).forEach(file => {
//                     const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${userFolder}/${file}`;
//                     imageUrls.push(imageUrl);
//                 });
//             }
//         });
//
//         res.json({ images: imageUrls });
//     });
// });

export default ImageRouter;
