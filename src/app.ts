import express from "express";
import cors from "cors";
import helmet from "helmet";
import songsRouter from "./api/v1/songs/songs.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Music Rehearsal Management API is running",
  });
});

app.use("/api/v1/songs", songsRouter);

app.use(errorHandler);

export default app;