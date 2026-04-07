import { AppError } from "../../../middleware/error.middleware";
import {
  CreateSetlistInput,
  Setlist,
  UpdateSetlistInput,
} from "./setlists.model";
import * as setlistsRepository from "./setlists.repository";

/**
 * Creates a new setlist.
 * @param data Setlist input data.
 * @returns The created setlist.
 */
export const createSetlist = async (
  data: CreateSetlistInput
): Promise<Setlist> => {
  return setlistsRepository.createSetlist(data);
};

/**
 * Gets all setlists.
 * @returns A list of setlists.
 */
export const getAllSetlists = async (): Promise<Setlist[]> => {
  return setlistsRepository.getAllSetlists();
};

/**
 * Gets one setlist by ID.
 * @param id Setlist document ID.
 * @returns The matching setlist.
 * @throws AppError when the setlist is not found.
 */
export const getSetlistById = async (id: string): Promise<Setlist> => {
  const setlist = await setlistsRepository.getSetlistById(id);

  if (!setlist) {
    throw new AppError("Setlist not found", 404);
  }

  return setlist;
};

/**
 * Updates one setlist by ID.
 * @param id Setlist document ID.
 * @param data Partial setlist update data.
 * @returns The updated setlist.
 * @throws AppError when the setlist is not found.
 */
export const updateSetlist = async (
  id: string,
  data: UpdateSetlistInput
): Promise<Setlist> => {
  const updatedSetlist = await setlistsRepository.updateSetlist(id, data);

  if (!updatedSetlist) {
    throw new AppError("Setlist not found", 404);
  }

  return updatedSetlist;
};

/**
 * Deletes one setlist by ID.
 * @param id Setlist document ID.
 * @returns A success message.
 * @throws AppError when the setlist is not found.
 */
export const deleteSetlist = async (
  id: string
): Promise<{ message: string }> => {
  const deleted = await setlistsRepository.deleteSetlist(id);

  if (!deleted) {
    throw new AppError("Setlist not found", 404);
  }

  return { message: "Setlist deleted successfully" };
};