import dbPool from "../services/db.js";

const CamerasManager = {
  async getAll() {
    try {
      const [result] = await dbPool.query("SELECT * FROM cameras");
      return result;
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des cameras:",
        err.message,
      );
      throw err;
    }
  },

  async create(camera) {
    try {
      const [result] = await dbPool.query("INSERT INTO cameras SET ?", camera);
      return { id: result.insertId, ...camera};
    } catch (err) {
      console.error(
        "Erreur lors de la création de la camera :",
        err.message,
      );
      throw err;
    }
  },

  async update(camera, id) {
    try {
      const [result] = await dbPool.query("UPDATE cameras SET ? WHERE id = ?", [
        camera,
        id,
      ]);
      return result;
    } catch (err) {
      console.error(
        "Erreur lors de la mise à jour de la camera :",
        err.message,
      );
      throw err;
    }
  },

  async delete(id) {
    try {
      const [result] = await dbPool.query("DELETE FROM cameras WHERE id = ?", id);
      return result.affectedRows;
    } catch (err) {
      console.error("Erreur lors de la jour de la camera :", err.message);
      throw err;
    }
  },
};

export default CamerasManager;
