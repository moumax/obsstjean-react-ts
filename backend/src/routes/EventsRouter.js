import EventsController from "../controllers/EventsController.js";
import { Router } from "express";

const eventsRouter = Router();

eventsRouter.get("/", EventsController.getAllEvents);
eventsRouter.post("/", EventsController.createEvent);
eventsRouter.put("/:id", EventsController.editEvent);
eventsRouter.delete("/:id", EventsController.deleteEvent);

export default eventsRouter;
