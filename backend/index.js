import dotenv from "dotenv";
dotenv.config()

import app from "./src/app.js"

const port = parseInt(process.env.APP_PORT ?? "5000", 10);

app.listen(port, (err) => {
  if (err) {
    console.error("Quelque chose s'est mal passé: ", err);
  } else {
    console.info(`Serveur à l'écoute sur le port: ${port}`);
  }
});
