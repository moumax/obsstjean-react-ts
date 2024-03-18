import GalleryManager from "../models/GalleryManager.js";

const GalleryController = {
  async getAllGalleries(req, res) {
    try {
      const gallery = await GalleryManager.getAll();
      res.status(200).json(gallery);
    } catch (err) {
      console.error("Error reading user folder:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async getOneGallery(req, res) {
    try {
      const gallery = await GalleryManager.getOne(req.params.owner)
      res.status(200).json(gallery)
    } catch (err) {
      console.error("Error on retreive the user gallery", err)
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async editPhoto(req, res) {
    const PhotoToUpdate = {
      title: req.body.title,
      description: req.body.description,
    };

    try {
      const updatedPhoto = await GalleryManager.edit(
        PhotoToUpdate,
        req.params.id,
      );
      res.status(200).json(updatedPhoto);
    } catch (error) {
      console.error("Erreur lors de la modification des paramètres de la photo", error);
      res
        .status(500)
        .send("Erreur lors de la modification des paramètres de la photo");
    }
  },
  async delete(req, res) {
    try {
      const photo = await GalleryManager.delete(req.params.id);
      res.status(204).json(photo);
    } catch (error) {
      console.error("erreur lors de la suppression de la photo", error);
      res.status(500).send("la photo n'a pas été supprimé");
    }
  },
};

export default GalleryController;
