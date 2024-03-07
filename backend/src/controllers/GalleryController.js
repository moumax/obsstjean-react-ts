import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const GalleryController = {
  async getAllGallery(req, res) {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);

    try {
      const imagesDirectory = path.join(__dirname, '..', '..', '..', 'backend', 'uploads');
      const userFolders = await fs.readdir(imagesDirectory);
      const imageUrls = [];

      for (const userFolder of userFolders) {
        if (!userFolder.startsWith('.')) {
          const userFolderPath = path.join(imagesDirectory, userFolder);
          const files = await fs.readdir(userFolderPath);
          for (const file of files) {
            if (!file.startsWith('.')) {
              const imageUrl = `${req.protocol}://${req.get('host')}/${userFolder}/${file}`;
              imageUrls.push(imageUrl);
            }
          }
        }
      }

      res.json({ images: imageUrls });
    } catch (err) {
      console.error('Error reading user folders:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  async getOneGallery(req, res) {
    const directoryName = path.dirname(fileURLToPath(import.meta.url));
    const username = req.params.username;
    const userFolderPath = path.join(directoryName, '..', '..', '..', 'backend', 'uploads', username);

    try {
      const files = await fs.readdir(userFolderPath);
      const imageUrls = files
        .filter(file => !file.startsWith('.'))
        .map(file => `${req.protocol}://${req.get('host')}/${username}/${file}`);

      res.json({ images: imageUrls });
    } catch (err) {
      console.error('Error reading user folder:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export default GalleryController;
