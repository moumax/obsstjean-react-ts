import RefractorsManager from "../models/RefractorsManager.js";

const RefractorsController = {
  async getAllRefractors(req, res) {
    try {
      const refractors = await RefractorsManager.getAll();
      res.status(200).json(refractors);
    } catch (error) {
      console.error("Erreur lors de la récupération des tubes optiques", error);
      res
        .status(500)
        .send("Erreur server lors de la récupération des tubes optiques");
    }
  },

  async createRefractor(req, res) {
    const newRefractor = {
      brand: req.body.brand,
      model: req.body.model,
      diameter: req.body.diameter,
      focal: req.body.focal,
      focal_ratio: req.body.focal_ratio,
      resolution: req.body.resolution,
    };

    try {
      const createdRefractor = await RefractorsManager.create({
        ...newRefractor,
      });

      res.status(201).json(createdRefractor);
    } catch (error) {
      console.error("Erreur lors de la création du tube optique", error);
      res
        .status(500)
        .send("Erreur serveur lors de la création du tube optique");
    }
  },

  async editRefractor(req, res) {
    const refractorToUpdate = {
      brand: req.body.brand,
      model: req.body.model,
      diameter: req.body.diameter,
      focal: req.body.focal,
      focal_ratio: req.body.focal_ratio,
      resolution: req.body.resolution,
    };

    try {
      const updatedRefractor = await RefractorManager.update(
        refractorToUpdate,
        req.params.id,
      );
      res.status(200).json(updatedRefractor);
    } catch (error) {
      console.error("Erreur lors de la modification du tube optique", error);
      res
        .status(500)
        .send("Erreur server lors de la modification du tube optique");
    }
  },

  async deleteRefractor(req, res) {
    try {
      const refractor = await RefractorsManager.delete(req.params.id);
      res.status(204).json(refractor);
    } catch (error) {
      console.error("Erreur lors de la suppression du tube optique", error);
      res.status(500).send("Le tube optique n'a pas été supprimé");
    }
  },
};

export default RefractorsController;
