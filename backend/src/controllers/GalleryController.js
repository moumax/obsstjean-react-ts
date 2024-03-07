import path from 'path';
import fs from 'fs/promises';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const getGallery = async (req, res) => {
  try {
    const imagesDirectory = path.join(__dirname, '..', '..', '..', 'backend', 'uploads');
    const userFolders = await fs.readdir(imagesDirectory);
    const imageUrls = [];

    for (const userFolder of userFolders) {
      if (!userFolder.startsWith('.')) {
        const userFolderPath = path.join(imagesDirectory, userFolder);
        const files = await fs.readdir(userFolderPath);
        for (const file of files) {
          // Filter out hidden system files
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
};

export { getGallery };
