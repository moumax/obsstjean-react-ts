import MembersController from '../controllers/MembersController.js'
import express from 'express'

const router = express.Router()

router.get('/', MembersController.getAllMembers)
router.post('/', MembersController.createMember)
router.put('/:id', MembersController.editMember)
router.delete('/:id', MembersController.deleteMember)

export default router
