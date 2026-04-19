import { Router } from "express";
import {
  createRehearsal,
  deleteRehearsal,
  getAllRehearsals,
  getRehearsalById,
  getUpcomingRehearsals,
  updateRehearsal,
} from "./rehearsals.controller";
import {
  requireRole,
  verifyFirebaseToken,
} from "../../../middleware/auth.middleware";

const rehearsalsRouter = Router();

rehearsalsRouter.post(
  "/",
  verifyFirebaseToken,
  requireRole("admin"),
  createRehearsal
);
rehearsalsRouter.get("/", verifyFirebaseToken, getAllRehearsals);
rehearsalsRouter.get(
  "/upcoming-reminders",
  verifyFirebaseToken,
  getUpcomingRehearsals
);
rehearsalsRouter.get("/:id", verifyFirebaseToken, getRehearsalById);
rehearsalsRouter.put(
  "/:id",
  verifyFirebaseToken,
  requireRole("admin"),
  updateRehearsal
);
rehearsalsRouter.delete(
  "/:id",
  verifyFirebaseToken,
  requireRole("admin"),
  deleteRehearsal
);

export default rehearsalsRouter;