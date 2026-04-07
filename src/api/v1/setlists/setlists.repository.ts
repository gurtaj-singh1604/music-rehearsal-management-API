import { DocumentData } from "firebase-admin/firestore";
import { db } from "../../../config/firebase";
import {
  CreateSetlistInput,
  Setlist,
  UpdateSetlistInput,
} from "./setlists.model";

const setlistsCollection = db.collection("setlists");

const mapSetlist = (id: string, data: DocumentData): Setlist => {
  return {
    id,
    name: data.name,
    songIds: data.songIds,
    notes: data.notes,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

/**
 * Creates a new setlist in Firestore.
 * @param data Setlist input data.
 * @returns The created setlist.
 */
export const createSetlist = async (
  data: CreateSetlistInput
): Promise<Setlist> => {
  const now = new Date().toISOString();
  const docRef = setlistsCollection.doc();

  const setlistData = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  await docRef.set(setlistData);

  return mapSetlist(docRef.id, setlistData);
};

/**
 * Gets all setlists from Firestore.
 * @returns A list of setlists.
 */
export const getAllSetlists = async (): Promise<Setlist[]> => {
  const snapshot = await setlistsCollection.get();

  return snapshot.docs.map((doc) => mapSetlist(doc.id, doc.data()));
};

/**
 * Gets one setlist by document ID.
 * @param id Setlist document ID.
 * @returns The matching setlist or null.
 */
export const getSetlistById = async (id: string): Promise<Setlist | null> => {
  const doc = await setlistsCollection.doc(id).get();

  if (!doc.exists) {
    return null;
  }

  const data = doc.data();

  if (!data) {
    return null;
  }

  return mapSetlist(doc.id, data);
};

/**
 * Updates an existing setlist.
 * @param id Setlist document ID.
 * @param data Partial setlist update data.
 * @returns The updated setlist or null if not found.
 */
export const updateSetlist = async (
  id: string,
  data: UpdateSetlistInput
): Promise<Setlist | null> => {
  const docRef = setlistsCollection.doc(id);
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

  return mapSetlist(updatedDoc.id, finalData);
};

/**
 * Deletes a setlist by document ID.
 * @param id Setlist document ID.
 * @returns True if deleted, false if not found.
 */
export const deleteSetlist = async (id: string): Promise<boolean> => {
  const docRef = setlistsCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    return false;
  }

  await docRef.delete();
  return true;
};