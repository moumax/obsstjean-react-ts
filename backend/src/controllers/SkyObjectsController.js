import SkyObjectsManager from "../models/SkyObjectsManager.js";

const SkyObjectsController = {
  async getAllSkyObjects(req, res) {
    try {
      const objects = await SkyObjectsManager.getAll();
      res.status(200).json(objects);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des objets célestes",
        error,
      );
      res
        .status(500)
        .send("Erreur server lors de la récupération des objets célestes");
    }
  },
};

export default SkyObjectsController;
