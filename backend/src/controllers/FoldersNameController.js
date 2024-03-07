import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const FoldersNameController = {
  async getAllFoldersName(req, res) {
    const currentDirname = path.dirname(fileURLToPath(import.meta.url))
    const publicFolderPath = path.join(currentDirname, '..', '..', '..', 'backend', 'uploads')

    try {
      const folderNames = fs.readdirSync(publicFolderPath, { withFileTypes: true })
        .filter(item => item.isDirectory())
        .map(item => item.name);
      res.json({ folderNames });
    } catch (error) {
      console.error("Erreur lors de la récupération des noms de dossiers", error);
      res.status(500).send("Erreur serveur lors de la récupération des des noms de dossiers");
    }
  },
}

export default FoldersNameController;
