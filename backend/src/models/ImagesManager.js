import dbPool from "../services/db.js";

const ImagesManager = {
  async getAll() {
  try {
    const [result] = await dbPool.query('SELECT * FROM images');
    return result;
  } catch (err) {
    console.error('Erreur lors de la récupération des images:', err.message);
    throw err;
  }
  },

async uploadImage(imageName, imagePath) {
  try {
    const [result] = await dbPool.query(
      'INSERT INTO images (imageName, imagePath) VALUES (?, ?)',
      [imageName, imagePath]
    );
    
    return { id: result.insertId, imageName, imagePath };
  } catch (err) {
    console.error(
      "Erreur lors de la création de la nouvelle image :",
      err.message,
    );
    throw err;
  }
},

}

export default ImagesManager;

