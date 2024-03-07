import EventsController from "../controllers/EventsController.js";

import express from 'express';

const router = express.Router();

router.get("/", EventsController.getAllEvents);
router.post("/", EventsController.createEvent);
router.put("/:id", EventsController.editEvent);
router.delete("/:id", EventsController.deleteEvent);

export default router;
