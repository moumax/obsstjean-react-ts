import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Router } from "express";
import fs from "fs";
import path from "path";
import authorization from "./middlewares/auth.js";
import { fileURLToPath } from "url";
import multer from "multer";
import AuthRouter from "./routes/AuthRouter.js";
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

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Le dossier où seront stockées les images
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Le nom original de l'image
  },
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

const directoryName = path.dirname(fileURLToPath(import.meta.url));
const staticFilesPath = path.join(directoryName, "..", "uploads");
app.use(express.static(staticFilesPath));

router.use("/auth", AuthRouter);
router.use("/users", UsersRouter);
router.use("/events", EventsRouter);
router.use("/members", authorization, MembersRouter);
router.use("/cameras", CamerasRouter);
router.use("/refractors", RefractorsRouter);
router.use("/wavelength", WavelengthRouter);
router.use("/skyobjects", SkyObjectsRouter);
router.use("/locations", LocationsRouter);
router.use("/gallery", GalleryRouter);

// Upload users images
router.use(
  "/upload",
  authorization,
  upload.single("image"),
  UploadImagesRouter,
);

app.use("/api", router);

app.get("/api/session", authorization, (req, res) => {
  res.json({
    name: req.userName,
    role: req.userRole,
    isAuthenticated: true,
  });
});

const currentModuleURL = new URL(import.meta.url);
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
