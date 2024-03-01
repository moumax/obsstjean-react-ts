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
import CamerasRouter from "./routes/CamerasRouter.js";
import RefractorsRouter from "./routes/RefractorsRouter.js";
import WavelengthRouter from "./routes/WavelengthRouter.js";
import SkyObjectsRouter from "./routes/SkyObjectsRouter.js";
import locationsRouter from "./routes/LocationsRouter.js";
import { fileURLToPath } from 'url';

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


const currentDirname = path.dirname(fileURLToPath(import.meta.url));
const publicFolderPath = path.join(currentDirname, '..', '..', 'frontend', 'public', 'Photos');

// Endpoint to fetch folder names
app.get('/folderNames', (req, res) => {
  try {
    // Read the directory and filter out only directories
    const folderNames = fs.readdirSync(publicFolderPath, { withFileTypes: true })
      .filter(item => item.isDirectory())
      .map(item => item.name);
    // Send the folder names as a JSON response
    console.log("folder", folderNames)
    res.json({ folderNames });
  } catch (error) {
    console.error('Error fetching folder names:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/events", eventsRouter);
router.use("/members", authorization, membersRouter);
router.use("/cameras", CamerasRouter);
router.use("/refractors", RefractorsRouter);
router.use("/wavelength", WavelengthRouter);
router.use("/skyobjects", SkyObjectsRouter);
router.use("/locations", locationsRouter);

app.use("/api", router);

// Endpoint pour récupérer les informations de session de l'utilisateur
app.get("/api/session", authorization, (req, res) => {
  res.json({
    name: req.userName,
    role: req.userRole,
    isAuthenticated: true,
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
