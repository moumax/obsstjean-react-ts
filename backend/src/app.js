import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Router } from "express";
import fs from "fs";
import path from "path";
import authorization from "./middlewares/auth.js";
import { fileURLToPath } from 'url';
import multer from "multer";
import authRouter from "./routes/AuthRouter.js";
import EventsRouter from "./routes/EventsRouter.js";
import MembersRouter from "./routes/MembersRouter.js";
import UsersRouter from "./routes/UsersRouter.js";
import CamerasRouter from "./routes/CamerasRouter.js";
import RefractorsRouter from "./routes/RefractorsRouter.js";
import WavelengthRouter from "./routes/WavelengthRouter.js";
import SkyObjectsRouter from "./routes/SkyObjectsRouter.js";
import LocationsRouter from "./routes/LocationsRouter.js";
import UploadImagesRouter from "./routes/UploadImagesRouter.js";
import GalleryRouter from "./routes/GalleryRouter.js";
import FoldersNameRouter from "./routes/FoldersNameRouter.js";

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
router.use("/users", UsersRouter);
router.use("/events", EventsRouter);
router.use("/members", authorization, MembersRouter);
router.use("/cameras", CamerasRouter);
router.use("/refractors", RefractorsRouter);
router.use("/wavelength", WavelengthRouter);
router.use("/skyobjects", SkyObjectsRouter);
router.use("/locations", LocationsRouter);

// Search for different gallery folders by username to display it on frontend
router.use("/foldersname", FoldersNameRouter);

// Upload users images
router.use('/upload', authorization, upload.single('image'), UploadImagesRouter);

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
