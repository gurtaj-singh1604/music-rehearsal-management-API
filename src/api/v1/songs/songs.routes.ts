import { Router } from "express";
import {
  createSong,
  deleteSong,
  getAllSongs,
  getSongById,
  updateSong,
} from "./songs.controller";
import {
  requireRole,
  verifyFirebaseToken,
} from "../../../middleware/auth.middleware";

const songsRouter = Router();

songsRouter.post("/", verifyFirebaseToken, requireRole("admin"), createSong);
songsRouter.get("/", verifyFirebaseToken, getAllSongs);
songsRouter.get("/:id", verifyFirebaseToken, getSongById);
songsRouter.put("/:id", verifyFirebaseToken, requireRole("admin"), updateSong);
songsRouter.delete(
  "/:id",
  verifyFirebaseToken,
  requireRole("admin"),
  deleteSong
);

export default songsRouter;