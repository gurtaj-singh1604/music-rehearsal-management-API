import { Router } from "express";
import {
  createSong,
  deleteSong,
  getAllSongs,
  getSongById,
  updateSong,
} from "./songs.controller";

const songsRouter = Router();

songsRouter.post("/", createSong);
songsRouter.get("/", getAllSongs);
songsRouter.get("/:id", getSongById);
songsRouter.put("/:id", updateSong);
songsRouter.delete("/:id", deleteSong);

export default songsRouter;