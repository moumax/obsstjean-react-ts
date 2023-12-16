const dbPool = require("../services/db")

const EventsManager = {
  getAll: () => {
    return dbPool
      .query("SELECT * FROM events")
      .then(([rows]) => rows)
      .catch((err) => {
        throw err
      });
  },

  create: (event) => {
    return dbPool
      .query("INSERT INTO events SET ?", event)
      .then(([result]) => ({ id: result.insertId, ...event }))
      .catch((err) => {
        throw err
      });
  },

  update: (event, id) => {
    return dbPool
      .query("UPDATE events SET ? WHERE id = ?", [event, id])
  },

  delete: (id) => {
    return dbPool
      .query("DELETE FROM events WHERE id = ?", id)
      .then(([result]) => result.affectedRows)
      .catch((err) => {
        throw err
      });
  }
}

module.exports = EventsManager
