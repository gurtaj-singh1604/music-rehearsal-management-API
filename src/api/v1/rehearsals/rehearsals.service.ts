import { AppError } from "../../../middleware/error.middleware";
import {
  CreateRehearsalInput,
  Rehearsal,
  UpdateRehearsalInput,
} from "./rehearsals.model";
import * as rehearsalsRepository from "./rehearsals.repository";

/**
 * Creates a new rehearsal.
 * @param data Rehearsal input data.
 * @returns The created rehearsal.
 */
export const createRehearsal = async (
  data: CreateRehearsalInput
): Promise<Rehearsal> => {
  return rehearsalsRepository.createRehearsal(data);
};

/**
 * Gets all rehearsals.
 * @returns A list of rehearsals.
 */
export const getAllRehearsals = async (): Promise<Rehearsal[]> => {
  return rehearsalsRepository.getAllRehearsals();
};

/**
 * Gets upcoming rehearsals within the provided number of hours.
 * @param hoursAhead Number of hours to look ahead.
 * @returns A list of upcoming rehearsals.
 */
export const getUpcomingRehearsals = async (
  hoursAhead: number
): Promise<Rehearsal[]> => {
  const rehearsals = await rehearsalsRepository.getAllRehearsals();
  const now = Date.now();
  const limit = now + hoursAhead * 60 * 60 * 1000;

  return rehearsals
    .filter((rehearsal) => {
      const rehearsalTime = new Date(rehearsal.date).getTime();

      return (
        !Number.isNaN(rehearsalTime) &&
        rehearsalTime >= now &&
        rehearsalTime <= limit
      );
    })
    .sort(
      (first, second) =>
        new Date(first.date).getTime() - new Date(second.date).getTime()
    );
};

/**
 * Gets one rehearsal by ID.
 * @param id Rehearsal document ID.
 * @returns The matching rehearsal.
 * @throws AppError when the rehearsal is not found.
 */
export const getRehearsalById = async (id: string): Promise<Rehearsal> => {
  const rehearsal = await rehearsalsRepository.getRehearsalById(id);

  if (!rehearsal) {
    throw new AppError("Rehearsal not found", 404);
  }

  return rehearsal;
};

/**
 * Updates one rehearsal by ID.
 * @param id Rehearsal document ID.
 * @param data Partial rehearsal update data.
 * @returns The updated rehearsal.
 * @throws AppError when the rehearsal is not found.
 */
export const updateRehearsal = async (
  id: string,
  data: UpdateRehearsalInput
): Promise<Rehearsal> => {
  const updatedRehearsal = await rehearsalsRepository.updateRehearsal(id, data);

  if (!updatedRehearsal) {
    throw new AppError("Rehearsal not found", 404);
  }

  return updatedRehearsal;
};

/**
 * Deletes one rehearsal by ID.
 * @param id Rehearsal document ID.
 * @returns A success message.
 * @throws AppError when the rehearsal is not found.
 */
export const deleteRehearsal = async (
  id: string
): Promise<{ message: string }> => {
  const deleted = await rehearsalsRepository.deleteRehearsal(id);

  if (!deleted) {
    throw new AppError("Rehearsal not found", 404);
  }

  return { message: "Rehearsal deleted successfully" };
};