import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../middleware/error.middleware";
import { sendSuccess } from "../../../utils/apiResponse";
import {
  createSetlistSchema,
  updateSetlistSchema,
} from "./setlists.validation";
import * as setlistsService from "./setlists.service";

type SetlistParams = {
  id: string;
};

const getValidationMessage = (error: any): string => {
  return error.details.map((detail: any) => detail.message).join(", ");
};

/**
 * Creates a new setlist.
 */
export const createSetlist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value } = createSetlistSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new AppError(getValidationMessage(error), 400);
    }

    const setlist = await setlistsService.createSetlist(value);

    sendSuccess(res, 201, "Setlist created successfully", setlist);
  } catch (err) {
    next(err);
  }
};

/**
 * Gets all setlists.
 */
export const getAllSetlists = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const setlists = await setlistsService.getAllSetlists();

    sendSuccess(res, 200, "Setlists retrieved successfully", setlists);
  } catch (err) {
    next(err);
  }
};

/**
 * Gets one setlist by ID.
 */
export const getSetlistById = async (
  req: Request<SetlistParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const setlist = await setlistsService.getSetlistById(req.params.id);

    sendSuccess(res, 200, "Setlist retrieved successfully", setlist);
  } catch (err) {
    next(err);
  }
};

/**
 * Updates one setlist by ID.
 */
export const updateSetlist = async (
  req: Request<SetlistParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value } = updateSetlistSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new AppError(getValidationMessage(error), 400);
    }

    const updatedSetlist = await setlistsService.updateSetlist(
      req.params.id,
      value
    );

    sendSuccess(res, 200, "Setlist updated successfully", updatedSetlist);
  } catch (err) {
    next(err);
  }
};

/**
 * Deletes one setlist by ID.
 */
export const deleteSetlist = async (
  req: Request<SetlistParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await setlistsService.deleteSetlist(req.params.id);

    sendSuccess(res, 200, result.message, null);
  } catch (err) {
    next(err);
  }
};