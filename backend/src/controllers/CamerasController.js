import CamerasManager from "../models/CamerasManager.js"

const CamerasController = {
  async getAllCameras(req, res) {
    try {
      const cameras = await CamerasManager.getAll();
      res.status(200).json(cameras);
    } catch (error) {
      console.error("Erreur lors de la récupération des cameras", error);
      res.status(500).send("Erreur server lors de la récupération des cameras");
    }
  },

  async createCamera(req, res) {
    const newCamera = {
      brand: req.body.brand,
      model: req.body.model,
      sensor: req.body.sensor,
      sensor_type: req.body.sensor_type,
      sensor_width_mm: req.sensor_width_mm,
      sensor_heigth_mm: req.sensor_heigth_mm,
      sensor_width_pixel: req.sensor_width_pixel,
      sensor_height_pixel: req.sensor_height_pixel,
      photosites: req.photosites,
      megapixels: req.megapixels,
      fps: req.fps,
      dynamic: req.dynamic,
      bits: req.bits,
      pixel_capacity: req.pixel_capacity,
      cooler: req.cooler,
    };

    try {
      const createdCamera = await CamerasManager.create({
        ...newCamera,
      });

      res.status(201).json(createdCamera);
    } catch (error) {
      console.error("Erreur lors de la création de la camera", error);
      res.status(500).send("Erreur serveur lors de la création de la camera");
    }
  },

  async editCamera(req, res) {
    const cameraToUpdate = {
      brand: req.body.brand,
      model: req.body.model,
      sensor: req.body.sensor,
      sensor_type: req.body.sensor_type,
      sensor_width_mm: req.sensor_width_mm,
      sensor_heigth_mm: req.sensor_heigth_mm,
      sensor_width_pixel: req.sensor_width_pixel,
      sensor_height_pixel: req.sensor_height_pixel,
      photosites: req.photosites,
      megapixels: req.megapixels,
      fps: req.fps,
      dynamic: req.dynamic,
      bits: req.bits,
      pixel_capacity: req.pixel_capacity,
      cooler: req.cooler,
    };

    try {
      const updatedCamera = await CamerasManager.update(
        cameraToUpdate,
        req.params.id,
      );
      res.status(200).json(updatedCamera);
    } catch (error) {
      console.error("Erreur lors de la modification de la camera", error);
      res.status(500).send("Erreur server lors de la modification de la camera");
    }
  },

  async deleteCamera(req, res) {
    try {
      const camera = await CamerasManager.delete(req.params.id);
      res.status(204).json(camera);
    } catch (error) {
      console.error("Erreur lors de la suppression de la camera", error);
      res.status(500).send("La camera n'a pas été supprimé");
    }
  },
};

export default CamerasController;
