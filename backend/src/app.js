import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Router } from "express";
import fs from "fs";
import path from "path";
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
import imageRouter from "./routes/ImageRouter.js";
import { fileURLToPath } from 'url';
import multer from "multer";
import GalleryRouter from "./routes/GalleryRouter.js";

const router = Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads'); // Le dossier où seront stockées les images
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname); // Le nom original de l'image
  }
});
const upload = multer({ storage: storage });

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

// Api to iterate on users folders photo
const currentDirname = path.dirname(fileURLToPath(import.meta.url));
const publicFolderPath = path.join(currentDirname, '..', '..', 'backend', 'uploads');
app.get('/folderNames', (req, res) => {
  try {
    const folderNames = fs.readdirSync(publicFolderPath, { withFileTypes: true })
      .filter(item => item.isDirectory())
      .map(item => item.name);
    console.log("folder", folderNames)
    res.json({ folderNames });
  } catch (error) {
    console.error('Error fetching folder names:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const directoyName = path.dirname(fileURLToPath(import.meta.url));
app.get("/user-images/:username", (req, res) => {
  const username = req.params.username;
  const userFolderPath = path.join(directoyName, '..', '..', 'backend', 'uploads', username);

  fs.readdir(userFolderPath, (err, files) => {
    if (err) {
      console.error('Error reading user folder:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const imageUrls = files
      .filter(file => !file.startsWith('.'))
      .map(file => `${req.protocol}://${req.get('host')}/${username}/${file}`);

    res.json({ images: imageUrls });
  });
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticFilesPath = path.join(__dirname, '..', 'uploads');
app.use(express.static(staticFilesPath));

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/events", eventsRouter);
router.use("/members", authorization, membersRouter);
router.use("/cameras", CamerasRouter);
router.use("/refractors", RefractorsRouter);
router.use("/wavelength", WavelengthRouter);
router.use("/skyobjects", SkyObjectsRouter);
router.use("/locations", locationsRouter);

// Upload users images
router.use('/images', authorization, upload.single('image'), imageRouter);

// Fetch all folder gallery's to display images on frontend
router.use("/gallery", GalleryRouter);

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
