import dbPool from '../services/db.js'

const memberManager = {
  async getAll() {
    try {
      const [result] = await dbPool.query('SELECT * FROM members')
      return result
    } catch (err) {
      console.error('Erreur lors de la récupération des membres :', err.message)
      throw err
    }
  },

  async create(member) {
    try {
      const [result] = await dbPool.query('INSERT INTO members SET ?', member)
      return { id: result.insertId, ...member }
    } catch (err) {
      console.error('Erreur lors de la création du membre :', err.message)
      throw err
    }
  },

  async update(member, id) {
    try {
      const [result] = await dbPool.query('UPDATE members SET ? WHERE id = ?', [
        member,
        id
      ])
      return result
    } catch (err) {
      console.error('Erreur lors de la mise à jour du membre :', err.message)
      throw err
    }
  },

  async delete(id) {
    try {
      const [result] = await dbPool.query(
        'DELETE FROM members WHERE id = ?',
        id
      )
      return result.affectedRows
    } catch (err) {
      console.error('Erreur lors de la jour du membre :', err.message)
      throw err
    }
  }
}

export default memberManager
