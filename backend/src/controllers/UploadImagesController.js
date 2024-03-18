import UploadImagesManager from "../models/UploadImagesManager.js";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const UploadImagesController = {
  async uploadImage(req, res) {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Veuillez sélectionner une image." });
    }

    const userName = req.userName;
    const imageFile = req.file;
    const title = req.body.title;
    const description = req.body.description;
    const owner = req.body.owner;
    const imageExtension = path.extname(imageFile.originalname);
    const imagePath = imageFile.path;
    const currentModuleURL = new URL(import.meta.url);
    const currentDirectory = path.dirname(currentModuleURL.pathname);
    const userFolder = path.join(
      currentDirectory,
      "..",
      "..",
      "uploads",
      userName,
    );

    // Create new random file name
    const randomFileName = uuidv4() + imageExtension;

    // Create a new image path
    const newImagePath = path.join(userFolder, randomFileName);

    // if userFolder doesn't exist, create one
    try {
      if (!fs.existsSync(userFolder)) {
        fs.mkdirSync(userFolder, { recursive: true });
      }
      fs.renameSync(imagePath, newImagePath);

      await UploadImagesManager.uploadImage(
        randomFileName,
        newImagePath,
        title,
        description,
        owner,
      );
      res.status(201).json({ message: "Image uploaded successfully" });
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image", error);
      res.status(500).send("Erreur serveur lors de l'upload de l'image");
    }
  },
};

export default UploadImagesController;
