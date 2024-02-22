import dbPool from "../services/db.js";

const SkyObjectsManager = {
  async getAll() {
    try {
      const [result] = await dbPool.query("SELECT * FROM sky_objects");
      return result;
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des objets célestes:",
        err.message,
      );
      throw err;
    }
  },
};

export default SkyObjectsManager;
