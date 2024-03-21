import dbPool from '../services/db.js'

const RefractorsManager = {
  async getAll() {
    try {
      const [result] = await dbPool.query('SELECT * FROM refractors')
      return result
    } catch (err) {
      console.error(
        'Erreur lors de la récupération des tubes optiques:',
        err.message
      )
      throw err
    }
  },

  async create(refractor) {
    try {
      const [result] = await dbPool.query(
        'INSERT INTO refractors SET ?',
        refractor
      )
      return { id: result.insertId, ...refractor }
    } catch (err) {
      console.error('Erreur lors de la création du tube optique :', err.message)
      throw err
    }
  },

  async update(refractor, id) {
    try {
      const [result] = await dbPool.query(
        'UPDATE refractors SET ? WHERE id = ?',
        [refractor, id]
      )
      return result
    } catch (err) {
      console.error(
        'Erreur lors de la mise à jour du tube optique :',
        err.message
      )
      throw err
    }
  },

  async delete(id) {
    try {
      const [result] = await dbPool.query(
        'DELETE FROM refractors WHERE id = ?',
        id
      )
      return result.affectedRows
    } catch (err) {
      console.error('Erreur lors de la jour du tube optique :', err.message)
      throw err
    }
  }
}

export default RefractorsManager
