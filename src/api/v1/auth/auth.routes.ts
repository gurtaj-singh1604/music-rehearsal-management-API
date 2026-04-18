import { Router } from "express";
import { verifyFirebaseToken } from "../../../middleware/auth.middleware";
import { getCurrentUser, loginUser, registerUser } from "./auth.controller";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/me", verifyFirebaseToken, getCurrentUser);

export default authRouter;