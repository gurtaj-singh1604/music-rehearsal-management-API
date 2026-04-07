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