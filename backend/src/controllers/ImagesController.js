import ImagesManager  from "../models/ImagesManager.js"
import fs from 'fs';
import path from 'path';

const ImagesController = {
  async getAllImages(req, res) {
    try {
      const images = await ImagesManager.getAllImages();
      res.status(200).json(images);
    } catch (error) {
      console.error("Erreur lors de la récupération des images", error);
      res.status(500).send("Erreur server lors de la récupération des images");
    }
  },

async uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'Veuillez sélectionner une image.' });
  }

  const userName = req.userName
  const imageName = req.file.originalname;
  const imagePath = req.file.path;
  
  // Function to modify the destination path for the images to match user name
  
    const currentModuleURL = new URL(import.meta.url);
    const currentDirectory = path.dirname(currentModuleURL.pathname);
    const userFolder = path.join(currentDirectory, "..", "..", "uploads", userName)
    const newImagePath = path.join(userFolder, imageName)

  try {
      if (!fs.existsSync(userFolder)) {
        fs.mkdirSync(userFolder, { recursive: true })
      }

      fs.renameSync(imagePath, newImagePath)

    const uploadedImage = await ImagesManager.uploadImage(imageName, imagePath);
    res.status(201).json(uploadedImage);
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image", error);
    res.status(500).send("Erreur serveur lors de l'upload de l'image");
  }
},
};

export default ImagesController;
