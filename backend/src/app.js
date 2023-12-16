const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const eventsRouter = require("./routes/EventsRouter");
const usersRouter = require("./routes/UsersRouter");
const router = express.Router();

const app = express();
app.use(express.json());

const cors = require("cors");

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

app.use(express.static(path.join(__dirname, "../public")));

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html",
);

if (fs.existsSync(reactIndexFile)) {
  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

module.exports = app;
