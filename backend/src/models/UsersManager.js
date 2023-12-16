const dbPool = require("../services/db")

const UsersManager = {
  getAll: () => {
    return dbPool
      .query("SELECT * FROM users")
      .then(([rows]) => rows)
      .catch((err) => {
        throw err
      });
  },

  create: (user) => {
    return dbPool
      .query("INSERT INTO users SET ?", user)
      .then(([result]) => ({ id: result.insertId, ...user}))
      .catch((err) => {
        throw err
      });
  },

  update: (user, id) => {
    return dbPool
      .query("UPDATE users SET ? WHERE id = ?", [user, id])
  },

  delete: (id) => {
    return dbPool
      .query("DELETE FROM users WHERE id = ?", id)
      .then(([result]) => result.affectedRows)
      .catch((err) => {
        throw err
      });
  }
}

module.exports = UsersManager
