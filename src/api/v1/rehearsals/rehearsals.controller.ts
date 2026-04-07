import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../middleware/error.middleware";
import { sendSuccess } from "../../../utils/apiResponse";
import {
  createRehearsalSchema,
  updateRehearsalSchema,
} from "./rehearsals.validation";
import * as rehearsalsService from "./rehearsals.service";

type RehearsalParams = {
  id: string;
};

const getValidationMessage = (error: any): string => {
  return error.details.map((detail: any) => detail.message).join(", ");
};

/**
 * Creates a new rehearsal.
 */
export const createRehearsal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value } = createRehearsalSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new AppError(getValidationMessage(error), 400);
    }

    const rehearsal = await rehearsalsService.createRehearsal(value);

    sendSuccess(res, 201, "Rehearsal created successfully", rehearsal);
  } catch (err) {
    next(err);
  }
};

/**
 * Gets all rehearsals.
 */
export const getAllRehearsals = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const rehearsals = await rehearsalsService.getAllRehearsals();

    sendSuccess(res, 200, "Rehearsals retrieved successfully", rehearsals);
  } catch (err) {
    next(err);
  }
};

/**
 * Gets one rehearsal by ID.
 */
export const getRehearsalById = async (
  req: Request<RehearsalParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const rehearsal = await rehearsalsService.getRehearsalById(req.params.id);

    sendSuccess(res, 200, "Rehearsal retrieved successfully", rehearsal);
  } catch (err) {
    next(err);
  }
};

/**
 * Updates one rehearsal by ID.
 */
export const updateRehearsal = async (
  req: Request<RehearsalParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value } = updateRehearsalSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new AppError(getValidationMessage(error), 400);
    }

    const updatedRehearsal = await rehearsalsService.updateRehearsal(
      req.params.id,
      value
    );

    sendSuccess(res, 200, "Rehearsal updated successfully", updatedRehearsal);
  } catch (err) {
    next(err);
  }
};

/**
 * Deletes one rehearsal by ID.
 */
export const deleteRehearsal = async (
  req: Request<RehearsalParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await rehearsalsService.deleteRehearsal(req.params.id);

    sendSuccess(res, 200, result.message, null);
  } catch (err) {
    next(err);
  }
};