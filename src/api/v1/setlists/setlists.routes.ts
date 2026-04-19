import { Router } from "express";
import {
  createSetlist,
  deleteSetlist,
  getAllSetlists,
  getSetlistById,
  updateSetlist,
} from "./setlists.controller";
import {
  requireRole,
  verifyFirebaseToken,
} from "../../../middleware/auth.middleware";

const setlistsRouter = Router();

setlistsRouter.post(
  "/",
  verifyFirebaseToken,
  requireRole("admin"),
  createSetlist
);
setlistsRouter.get("/", verifyFirebaseToken, getAllSetlists);
setlistsRouter.get("/:id", verifyFirebaseToken, getSetlistById);
setlistsRouter.put(
  "/:id",
  verifyFirebaseToken,
  requireRole("admin"),
  updateSetlist
);
setlistsRouter.delete(
  "/:id",
  verifyFirebaseToken,
  requireRole("admin"),
  deleteSetlist
);

export default setlistsRouter;