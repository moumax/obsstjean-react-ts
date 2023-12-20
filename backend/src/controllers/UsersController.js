import UsersManager from "../models/UsersManager.js";
import { hashPassword } from "../helpers/argonHelper.js";

const UsersController = {
  async getAllUsers(req, res) {
    try {
      const users = await UsersManager.getAll();
      res.status(200).json(users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
      res
        .status(500)
        .send("Erreur server lors de la récupération des utilisateurs");
    }
  },

  async createUser(req, res) {
    const newUser = {
      email: req.body.email,
      name: req.body.name,
      password_hash: req.body.password,
      role: req.body.role,
    };

    try {
      const hash = await new Promise((resolve, reject) => {
        hashPassword(newUser.password_hash)
          .then(delete newUser.password_hash)
          .then(resolve)
          .catch(reject);
      });

      const createdUser = await UsersManager.create({
        ...newUser,
        password_hash: hash,
      });

      res.status(201).json(createdUser);
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur", error);
      res
        .status(500)
        .send("Erreur serveur lors de la création de l'utilisateur");
    }
  },

  async editUser(req, res) {
    const userToUpdate = {
      email: req.body.email,
      name: req.body.name,
      role: req.body.role,
      password_hash: req.body.password,
    };

    try {
      const updatedUser = await UsersManager.update(
        userToUpdate,
        req.params.id,
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur", error);
      res
        .status(500)
        .send("Erreur server lors de la modification de l'utilisateur");
    }
  },

  async deleteUser(req, res) {
    try {
      const users = await UsersManager.delete(req.params.id);
      res.status(204).json(users);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur", error);
      res.status(500).send("L'utilisateur n'a pas été supprimé");
    }
  },
};

export default UsersController;
