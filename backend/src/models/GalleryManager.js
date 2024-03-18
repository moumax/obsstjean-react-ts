import dbpool from "../services/db.js";

const GalleryManager = {
  async getAll() {
    try {
      const [result] = await dbpool.query("select * FROM images");
      return result;
    } catch (err) {
      throw err;
    }
  },
  async getOne(username) {
    try {
      const [result] = await dbpool.query("SELECT * FROM images WHERE owner = ?", [username]);
      return result;
    } catch (err) {
      throw err;
    }
  },
  async delete(id) {
    try {
      const [result] = await dbpool.query("DELETE FROM images WHERE id = ?", id);
      return result.affectedRows;
    } catch (err) {
      console.error("Erreur lors de la suppression de la photo :", err.message);
      throw err;
    }
  },
};

export default GalleryManager;
