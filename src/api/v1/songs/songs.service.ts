import { AppError } from "../../../middleware/error.middleware";
import { CreateSongInput, Song, UpdateSongInput } from "./songs.model";
import * as songsRepository from "./songs.repository";

/**
 * Creates a new song.
 * @param data Song input data.
 * @returns The created song.
 */
export const createSong = async (data: CreateSongInput): Promise<Song> => {
  return songsRepository.createSong(data);
};

/**
 * Gets all songs.
 * @returns A list of songs.
 */
export const getAllSongs = async (): Promise<Song[]> => {
  return songsRepository.getAllSongs();
};

/**
 * Gets one song by ID.
 * @param id Song document ID.
 * @returns The matching song.
 * @throws AppError when the song is not found.
 */
export const getSongById = async (id: string): Promise<Song> => {
  const song = await songsRepository.getSongById(id);

  if (!song) {
    throw new AppError("Song not found", 404);
  }

  return song;
};

/**
 * Updates one song by ID.
 * @param id Song document ID.
 * @param data Partial song update data.
 * @returns The updated song.
 * @throws AppError when the song is not found.
 */
export const updateSong = async (
  id: string,
  data: UpdateSongInput
): Promise<Song> => {
  const updatedSong = await songsRepository.updateSong(id, data);

  if (!updatedSong) {
    throw new AppError("Song not found", 404);
  }

  return updatedSong;
};

/**
 * Deletes one song by ID.
 * @param id Song document ID.
 * @returns A success message.
 * @throws AppError when the song is not found.
 */
export const deleteSong = async (
  id: string
): Promise<{ message: string }> => {
  const deleted = await songsRepository.deleteSong(id);

  if (!deleted) {
    throw new AppError("Song not found", 404);
  }

  return { message: "Song deleted successfully" };
};