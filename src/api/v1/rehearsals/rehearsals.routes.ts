import { Router } from "express";
import {
  createRehearsal,
  deleteRehearsal,
  getAllRehearsals,
  getRehearsalById,
  updateRehearsal,
} from "./rehearsals.controller";

const rehearsalsRouter = Router();

rehearsalsRouter.post("/", createRehearsal);
rehearsalsRouter.get("/", getAllRehearsals);
rehearsalsRouter.get("/:id", getRehearsalById);
rehearsalsRouter.put("/:id", updateRehearsal);
rehearsalsRouter.delete("/:id", deleteRehearsal);

export default rehearsalsRouter;