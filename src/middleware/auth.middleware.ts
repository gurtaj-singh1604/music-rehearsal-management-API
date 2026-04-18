import { NextFunction, Request, Response } from "express";
import { adminAuth } from "../config/firebase";
import { AppError } from "./error.middleware";

export type AuthenticatedUser = {
  uid: string;
  email?: string;
  role: string;
};

type AuthenticatedResponseLocals = {
  authUser?: AuthenticatedUser;
};

/**
 * Verifies the Firebase ID token from the Authorization header.
 */
export const verifyFirebaseToken = async (
  req: Request,
  res: Response<unknown, AuthenticatedResponseLocals>,
  next: NextFunction
): Promise<void> => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new AppError("Authorization header is missing", 401);
    }

    const [scheme, token] = authorizationHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new AppError(
        "Authorization header must be in the format: Bearer <token>",
        401
      );
    }

    const decodedToken = await adminAuth.verifyIdToken(token);

    res.locals.authUser = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role:
        typeof decodedToken.role === "string" ? decodedToken.role : "member",
    };

    next();
  } catch {
    next(new AppError("Invalid or expired authentication token", 401));
  }
};