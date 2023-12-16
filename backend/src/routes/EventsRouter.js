const express = require('express');
const EventsController = require("../controllers/EventsController")

const router = express.Router();

router.get("/", EventsController.getAllEvents);
router.post("/", EventsController.createEvent);
router.put("/:id", EventsController.editEvent);
router.delete("/:id", EventsController.deleteEvent);

module.exports = router;
