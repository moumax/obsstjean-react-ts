import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Router } from "express";
import fs from "node:fs";
import path from "node:path";
import authorization from "./middlewares/auth.js";
import authRouter from "./routes/AuthRouter.js";
import eventsRouter from "./routes/EventsRouter.js";
import membersRouter from "./routes/MembersRouter.js";
import usersRouter from "./routes/UsersRouter.js";

const router = Router();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

router.use("/auth", authRouter);
router.use("/users", authorization, usersRouter);
router.use("/events", eventsRouter);
router.use("/members", authorization, membersRouter);

app.use("/api", router);

// Endpoint pour récupérer les informations de session de l'utilisateur
app.get("/api/session", authorization, (req, res) => {
  res.json({
    name: req.userName,
    role: req.userRole,
  });
});

// Utilisez import.meta.url pour obtenir l'URL du module actuel
const currentModuleURL = new URL(import.meta.url);
// Utilisez path.dirname pour extraire le chemin du répertoire
const currentDirectory = path.dirname(currentModuleURL.pathname);

app.use(express.static(path.join(currentDirectory, "../public")));

const reactIndexFile = path.join(
  currentDirectory,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html",
);

if (fs.existsSync(reactIndexFile)) {
  app.use(
    express.static(path.join(currentDirectory, "..", "..", "frontend", "dist")),
  );

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

export default app;
