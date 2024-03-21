import express from 'express'
import WavelengthController from '../controllers/WavelengthController.js'

const WavelengthRouter = express.Router()

WavelengthRouter.get('/', WavelengthController.getAllWavelength)

export default WavelengthRouter
