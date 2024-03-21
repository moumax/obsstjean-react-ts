import dbPool from '../services/db.js'

const UploadImagesManager = {
  async getAll() {
    try {
      const [result] = await dbPool.query('SELECT * FROM images')
      return result
    } catch (err) {
      console.error('Erreur lors de la récupération des images:', err.message)
      throw err
    }
  },

  async uploadImage(imageName, imagePath, title, description, owner) {
    try {
      const [result] = await dbPool.query(
        'INSERT INTO images (imageName, imagePath, title, description, owner) VALUES (?, ?, ?, ?, ?)',
        [imageName, imagePath, title, description, owner]
      )

      return {
        id: result.insertId,
        imageName,
        imagePath,
        title,
        description,
        owner
      }
    } catch (err) {
      console.error(
        'Erreur lors de la création de la nouvelle image :',
        err.message
      )
      throw err
    }
  }
}

export default UploadImagesManager
