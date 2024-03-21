import dbpool from '../services/db.js'
import fs from 'fs/promises'
import path from 'path'

const GalleryManager = {
  async getAll() {
    try {
      const [result] = await dbpool.query('select * FROM images')
      return result
    } catch (err) {
      throw err
    }
  },
  async getOne(username) {
    try {
      const [result] = await dbpool.query(
        'SELECT * FROM images WHERE owner = ?',
        [username]
      )
      return result
    } catch (err) {
      throw err
    }
  },
  async edit(title, description, id) {
    try {
      const [result] = await dbpool.query('UPDATE images SET ? WHERE id = ?', [
        title,
        description,
        id
      ])
      return result
    } catch (err) {
      throw err
    }
  },
  async delete(id) {
    try {
      const [photo] = await dbpool.query('SELECT * FROM images WHERE id = ?', [
        id
      ])
      const filepath = photo[0].imagePath
      const imagename = photo[0].imageName
      const prefix = 'original_'
      const fullPathResized = path.join(filepath, imagename)
      const fullPathOriginal = path.join(filepath, prefix + imagename)

      await fs.unlink(fullPathResized)
      await fs.unlink(fullPathOriginal)

      const [result] = await dbpool.query('DELETE FROM images WHERE id = ?', id)
      return result.affectedRows
    } catch (err) {
      console.error('Erreur lors de la suppression de la photo :', err.message)
      throw err
    }
  }
}

export default GalleryManager
