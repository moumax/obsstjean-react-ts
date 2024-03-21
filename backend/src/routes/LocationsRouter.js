import LocationsController from '../controllers/LocationsController.js'
import express from 'express'

const router = express.Router()

router.get('/', LocationsController.getAllLocations)
router.post('/', LocationsController.createLocation)
router.put('/:id', LocationsController.editLocation)
router.delete('/:id', LocationsController.deleteLocation)

export default router
