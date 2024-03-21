import UploadImagesManager from '../models/UploadImagesManager.js'
import fs from 'fs'
import path from 'path'

const UploadImagesController = {
  async uploadImage(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ message: 'Please, select at least one picture' })
    }

    const userName = req.userName

    try {
      for (const imageFile of req.files) {
        const title = req.body.title
        const description = req.body.description || ''
        const owner = req.body.owner || ''
        const imagePath = imageFile.path
        const currentModuleURL = new URL(import.meta.url)
        const currentDirectory = path.dirname(currentModuleURL.pathname)
        const userFolder = path.join(
          currentDirectory,
          '..',
          '..',
          'uploads',
          userName
        )

        const originalFileName = path.basename(imagePath)
        const newImagePath = path.join(userFolder, originalFileName)

        if (!fs.existsSync(userFolder)) {
          fs.mkdirSync(userFolder, { recursive: true })
        }

        fs.renameSync(imagePath, newImagePath)

        if (originalFileName.startsWith('original_')) {
          continue
        }

        await UploadImagesManager.uploadImage(
          originalFileName,
          userFolder,
          title,
          description,
          owner
        )
      }

      res.status(201).json({ message: 'Images uploaded successfully' })
    } catch (error) {
      console.error("Erreur lors de l'upload des images", error)
      res.status(500).send("Erreur serveur lors de l'upload des images")
    }
  }
}

export default UploadImagesController
