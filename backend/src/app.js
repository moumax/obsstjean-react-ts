import cookieParser from "cookie-parser";
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

import cors from "cors";

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

router.use("/users", usersRouter);
router.use("/events", eventsRouter);
router.use("/members", authorization, membersRouter);
router.use("/auth", authRouter);

app.use("/api", router);
app.use(cookieParser());

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
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  app.use(
    express.static(path.join(currentDirectory, "..", "..", "frontend", "dist"))
  );

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

export default app;
