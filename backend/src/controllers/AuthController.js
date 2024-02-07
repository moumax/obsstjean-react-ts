import { verifyPassword } from "../helpers/argonHelper.js";
import { encodeJwt } from "../helpers/jwtHelper.js";
import UsersManager from "../models/UsersManager.js";

const AuthController = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UsersManager.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "" });
      }
      const passwordMatch = await verifyPassword(
        password,
        user[0].password_hash,
      );

      if (!passwordMatch) {
        return res.status(401).json({ message: "Utilisateur invalide" });
      }

      const token = encodeJwt({
        email: user[0].email,
        name: user[0].name,
        role: user[0].role,
      });

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        SameSite: "strict",
      });
      res.status(200).json({ name: user[0].name, role: user[0].role });
    } catch (err) {
      console.error("Erreur de connexion", err);
      res.status(500).send("Erreur interne du server");
    }
  },
  async logout(req, res) {
    res.clearCookie("access_token", { path: "/" }).status(200).send("Ok.");
  },
};

export default AuthController;
