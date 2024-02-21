import dbPool from "../services/db.js";

const WavelengthManager = {
  async getAll() {
    try {
      const [result] = await dbPool.query("SELECT * FROM wave_length");
      return result;
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des longueurs d'ondes:",
        err.message,
      );
      throw err;
    }
  },
};

export default WavelengthManager;
