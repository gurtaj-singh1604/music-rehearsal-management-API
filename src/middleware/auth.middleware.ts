import { NextFunction, Request, Response } from "express";
import { adminAuth } from "../config/firebase";
import { AppRole } from "../api/v1/auth/auth.model";
import { AppError } from "./error.middleware";

export type AuthenticatedUser = {
  uid: string;
  email?: string;
  role: AppRole;
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
        decodedToken.role === "admin" || decodedToken.role === "member"
          ? decodedToken.role
          : "member",
    };

    next();
  } catch {
    next(new AppError("Invalid or expired authentication token", 401));
  }
};

/**
 * Restricts access to one or more allowed roles.
 * @param allowedRoles Roles allowed to access the route.
 */
export const requireRole =
  (...allowedRoles: AppRole[]) =>
  (
    _req: Request,
    res: Response<unknown, AuthenticatedResponseLocals>,
    next: NextFunction
  ): void => {
    const authUser = res.locals.authUser;

    if (!authUser) {
      next(new AppError("Authenticated user not found", 401));
      return;
    }

    if (!allowedRoles.includes(authUser.role)) {
      next(
        new AppError("You do not have permission to access this resource", 403)
      );
      return;
    }

    next();
  };