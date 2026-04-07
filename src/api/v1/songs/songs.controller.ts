import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../middleware/error.middleware";
import { sendSuccess } from "../../../utils/apiResponse";
import { createSongSchema, updateSongSchema } from "./songs.validation";
import * as songsService from "./songs.service";

type SongParams = {
  id: string;
};

const getValidationMessage = (error: any): string => {
  return error.details.map((detail: any) => detail.message).join(", ");
};

/**
 * Creates a new song.
 */
export const createSong = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value } = createSongSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new AppError(getValidationMessage(error), 400);
    }

    const song = await songsService.createSong(value);

    sendSuccess(res, 201, "Song created successfully", song);
  } catch (err) {
    next(err);
  }
};

/**
 * Gets all songs.
 */
export const getAllSongs = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const songs = await songsService.getAllSongs();

    sendSuccess(res, 200, "Songs retrieved successfully", songs);
  } catch (err) {
    next(err);
  }
};

/**
 * Gets one song by ID.
 */
export const getSongById = async (
  req: Request<SongParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const song = await songsService.getSongById(req.params.id);

    sendSuccess(res, 200, "Song retrieved successfully", song);
  } catch (err) {
    next(err);
  }
};

/**
 * Updates one song by ID.
 */
export const updateSong = async (
  req: Request<SongParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value } = updateSongSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new AppError(getValidationMessage(error), 400);
    }

    const updatedSong = await songsService.updateSong(req.params.id, value);

    sendSuccess(res, 200, "Song updated successfully", updatedSong);
  } catch (err) {
    next(err);
  }
};

/**
 * Deletes one song by ID.
 */
export const deleteSong = async (
  req: Request<SongParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await songsService.deleteSong(req.params.id);

    sendSuccess(res, 200, result.message, null);
  } catch (err) {
    next(err);
  }
};