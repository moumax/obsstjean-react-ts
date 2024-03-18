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
};

export default GalleryManager;
