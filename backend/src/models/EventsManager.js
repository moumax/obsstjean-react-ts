import dbPool from "../services/db.js";

const EventsManager = {
  async getAll() {
    try {
      const [result] = await dbPool.query("SELECT * FROM events");
      return result;
    } catch (err) {
      throw err;
    }
  },

  async create(eventData) {
    try {
      const [result] = await dbPool.query(
        "INSERT INTO events SET ?",
        eventData,
      );
      return { id: result.insertId, ...eventData };
    } catch (err) {
      throw err;
    }
  },

  async update(event, id) {
    try {
      const [result] = await dbPool.query("UPDATE events SET ? WHERE id = ?", [
        event,
        id,
      ]);
      return result;
    } catch (err) {
      throw err;
    }
  },

  async delete(id) {
    try {
      const [result] = await dbPool.query(
        "DELETE FROM events WHERE id = ?",
        id,
      );
      return result.affectedRows;
    } catch (err) {
      throw err;
    }
  },
};

export default EventsManager;
