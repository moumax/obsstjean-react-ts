import UsersController from '../controllers/UsersController.js'
import express from 'express'

const router = express.Router()

router.get('/', UsersController.getAllUsers)
router.post('/', UsersController.createUser)
router.put('/:id', UsersController.editUser)
router.delete('/:id', UsersController.deleteUser)

export default router
