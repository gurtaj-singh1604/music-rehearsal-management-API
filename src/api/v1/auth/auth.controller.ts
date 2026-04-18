import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../middleware/error.middleware";
import { sendSuccess } from "../../../utils/apiResponse";
import { loginUserSchema, registerUserSchema } from "./auth.validation";
import * as authService from "./auth.service";

const getValidationMessage = (error: {
  details: Array<{ message: string }>;
}): string => {
  return error.details.map((detail) => detail.message).join(", ");
};

/**
 * Registers a new auth user.
 */
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value } = registerUserSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new AppError(getValidationMessage(error), 400);
    }

    const user = await authService.registerUser(value);

    sendSuccess(res, 201, "User registered successfully", user);
  } catch (err) {
    next(err);
  }
};

/**
 * Logs in an existing auth user.
 */
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value } = loginUserSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new AppError(getValidationMessage(error), 400);
    }

    const user = await authService.loginUser(value);

    sendSuccess(res, 200, "Login successful", user);
  } catch (err) {
    next(err);
  }
};

/**
 * Returns the currently authenticated user from the verified token.
 */
export const getCurrentUser = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authUser = res.locals.authUser;

    if (!authUser) {
      throw new AppError("Authenticated user not found", 401);
    }

    sendSuccess(res, 200, "Current user retrieved successfully", authUser);
  } catch (err) {
    next(err);
  }
};