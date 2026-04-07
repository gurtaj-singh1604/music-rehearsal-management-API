import { Router } from "express";
import {
  createSetlist,
  deleteSetlist,
  getAllSetlists,
  getSetlistById,
  updateSetlist,
} from "./setlists.controller";

const setlistsRouter = Router();

setlistsRouter.post("/", createSetlist);
setlistsRouter.get("/", getAllSetlists);
setlistsRouter.get("/:id", getSetlistById);
setlistsRouter.put("/:id", updateSetlist);
setlistsRouter.delete("/:id", deleteSetlist);

export default setlistsRouter;