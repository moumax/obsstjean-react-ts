import fs from "node:fs";
import path from "node:path";
import express, { Router } from "express";
import eventsRouter from "./routes/EventsRouter.js";
import usersRouter from "./routes/UsersRouter.js";

const router = Router();

const app = express();
app.use(express.json());

import cors from "cors";

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

router.use("/users", usersRouter);
router.use("/events", eventsRouter);
app.use(router);

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
