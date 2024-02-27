import LocationsController from "../controllers/LocationsController.js";
import { Router } from "express";

const locationsRouter = Router();

locationsRouter.get("/", LocationsController.getAllLocations);
locationsRouter.post("/", LocationsController.createLocation);
locationsRouter.put("/:id", LocationsController.editLocation);
locationsRouter.delete("/:id", LocationsController.deleteLocation);

export default locationsRouter;
