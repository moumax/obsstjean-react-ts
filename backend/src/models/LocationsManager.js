import dbPool from "../services/db.js";

const LocationsManager = {
  async getAll() {
    try {
      const [result] = await dbPool.query("SELECT * FROM locations");
      return result;
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des lieux:",
        err.message,
      );
      throw err;
    }
  },

  async create(location) {
    try {
      const [result] = await dbPool.query("INSERT INTO locations SET ?", location);
      return { id: result.insertId, ...location};
    } catch (err) {
      console.error(
        "Erreur lors de la création du nouveau lieu :",
        err.message,
      );
      throw err;
    }
  },

  async update(location, id) {
    try {
      const [result] = await dbPool.query("UPDATE locations SET ? WHERE id = ?", [
        location,
        id,
      ]);
      return result;
    } catch (err) {
      console.error(
        "Erreur lors de la mise à jour du lieu :",
        err.message,
      );
      throw err;
    }
  },

  async delete(id) {
    try {
      const [result] = await dbPool.query("DELETE FROM locations WHERE id = ?", id);
      return result.affectedRows;
    } catch (err) {
      console.error("Erreur lors de la suppression du lieu :", err.message);
      throw err;
    }
  },
};

export default LocationsManager;
