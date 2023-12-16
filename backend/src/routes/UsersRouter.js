const express = require('express');
const UsersController = require("../controllers/UsersController")

const router = express.Router();

router.get("/", UsersController.getAllUsers);
router.post("/", UsersController.createUser);
router.put("/:id", UsersController.editUser);
router.delete("/:id", UsersController.deleteUser);

module.exports = router;