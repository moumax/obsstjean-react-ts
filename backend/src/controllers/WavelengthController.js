import WavelengthManager from "../models/WavelengthManager.js";

const WavelengthController = {
  async getAllWavelength(req, res) {
    try {
      const wavelength= await WavelengthManager.getAll();
      res.status(200).json(wavelength);
    } catch (error) {
      console.error("Erreur lors de la récupération des longueurs d'ondes", error);
      res.status(500).send("Erreur server lors de la récupération des longueurs d'ondes");
    }
  },
};

export default WavelengthController;
