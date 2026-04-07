import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import songsRouter from "./api/v1/songs/songs.routes";
import setlistsRouter from "./api/v1/setlists/setlists.routes";
import rehearsalsRouter from "./api/v1/rehearsals/rehearsals.routes";
import { swaggerSpec } from "./config/swagger";
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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api-docs.json", (_req, res) => {
  res.status(200).json(swaggerSpec);
});

app.use("/api/v1/songs", songsRouter);
app.use("/api/v1/setlists", setlistsRouter);
app.use("/api/v1/rehearsals", rehearsalsRouter);

app.use(errorHandler);

export default app;