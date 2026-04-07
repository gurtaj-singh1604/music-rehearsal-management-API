import { DocumentData } from "firebase-admin/firestore";
import { db } from "../../../config/firebase";
import { CreateSongInput, Song, UpdateSongInput } from "./songs.model";

const songsCollection = db.collection("songs");

const mapSong = (id: string, data: DocumentData): Song => {
  return {
    id,
    title: data.title,
    artist: data.artist,
    key: data.key,
    tempo: data.tempo,
    duration: data.duration,
    genre: data.genre,
    status: data.status,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

/**
 * Creates a new song in Firestore.
 * @param data Song input data.
 * @returns The created song.
 */
export const createSong = async (data: CreateSongInput): Promise<Song> => {
  const now = new Date().toISOString();
  const docRef = songsCollection.doc();

  const songData = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  await docRef.set(songData);

  return mapSong(docRef.id, songData);
};

/**
 * Gets all songs from Firestore.
 * @returns A list of songs.
 */
export const getAllSongs = async (): Promise<Song[]> => {
  const snapshot = await songsCollection.get();

  return snapshot.docs.map((doc) => mapSong(doc.id, doc.data()));
};

/**
 * Gets one song by document ID.
 * @param id Song document ID.
 * @returns The matching song or null.
 */
export const getSongById = async (id: string): Promise<Song | null> => {
  const doc = await songsCollection.doc(id).get();

  if (!doc.exists) {
    return null;
  }

  const data = doc.data();

  if (!data) {
    return null;
  }

  return mapSong(doc.id, data);
};

/**
 * Updates an existing song.
 * @param id Song document ID.
 * @param data Partial song update data.
 * @returns The updated song or null if not found.
 */
export const updateSong = async (
  id: string,
  data: UpdateSongInput
): Promise<Song | null> => {
  const docRef = songsCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    return null;
  }

  const updatedData = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  await docRef.update(updatedData);

  const updatedDoc = await docRef.get();
  const finalData = updatedDoc.data();

  if (!finalData) {
    return null;
  }

  return mapSong(updatedDoc.id, finalData);
};

/**
 * Deletes a song by document ID.
 * @param id Song document ID.
 * @returns True if deleted, false if not found.
 */
export const deleteSong = async (id: string): Promise<boolean> => {
  const docRef = songsCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    return false;
  }

  await docRef.delete();
  return true;
};