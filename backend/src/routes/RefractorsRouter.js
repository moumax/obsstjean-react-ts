import express from "express";
import RefractorsController from "../controllers/RefractorsController.js"

const RefractorsRouter = express.Router();

RefractorsRouter.get("/", RefractorsController.getAllRefractors);
RefractorsRouter.post("/", RefractorsController.createRefractor);
RefractorsRouter.put("/:id", RefractorsController.editRefractor);
RefractorsRouter.delete("/:id", RefractorsController.deleteRefractor);

export default RefractorsRouter;
