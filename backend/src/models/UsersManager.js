import dbPool from "../services/db.js";

const userManager = {
  async getAll() {
    try {
      const [result] = await dbPool.query("SELECT * FROM users");
      return result;
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des utilisateurs :",
        err.message,
      );
      throw err;
    }
  },

  async getUserByEmail(email) {
    try {
      const [result] = await dbPool.query("SELECT * FROM users WHERE email = ?", email);
      return result
    } catch (err) {
      console.error(
        "Erreur lors de la récupération d'un utilisateur par son email :",
        err.message,
      );
      throw err;
    }
  },

  async create(user) {
    try {
      const [result] = await dbPool.query("INSERT INTO users SET ?", user);
      return { id: result.insertId, ...user };
    } catch (err) {
      console.error(
        "Erreur lors de la création de l'utilisateur :",
        err.message,
      );
      throw err;
    }
  },

  async update(user, id) {
    try {
      const [result] = await dbPool.query("UPDATE users SET ? WHERE id = ?", [
        user,
        id,
      ]);
      return result;
    } catch (err) {
      console.error(
        "Erreur lors de la mise à jour de l'utilisateur :",
        err.message,
      );
      throw err;
    }
  },

  async delete(id) {
    try {
      const [result] = await dbPool.query("DELETE FROM users WHERE id = ?", id);
      return result.affectedRows;
    } catch (err) {
      console.error("Erreur lors de la jour de l'utilisateur :", err.message);
      throw err;
    }
  },
};

export default userManager;
