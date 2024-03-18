import GalleryManager from "../models/GalleryManager.js";

const GalleryController = {
  async getAllGalleries(req, res) {
    try {
      const gallery = await GalleryManager.getAll();
      console.log("gallery", gallery);
      res.status(200).json(gallery);
    } catch (err) {
      console.error("Error reading user folder:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default GalleryController;
