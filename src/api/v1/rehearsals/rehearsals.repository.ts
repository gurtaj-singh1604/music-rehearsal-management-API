import { DocumentData } from "firebase-admin/firestore";
import { db } from "../../../config/firebase";
import {
  CreateRehearsalInput,
  Rehearsal,
  UpdateRehearsalInput,
} from "./rehearsals.model";

const rehearsalsCollection = db.collection("rehearsals");

const mapRehearsal = (id: string, data: DocumentData): Rehearsal => {
  return {
    id,
    date: data.date,
    location: data.location,
    goals: data.goals,
    setlistId: data.setlistId,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

/**
 * Creates a new rehearsal in Firestore.
 * @param data Rehearsal input data.
 * @returns The created rehearsal.
 */
export const createRehearsal = async (
  data: CreateRehearsalInput
): Promise<Rehearsal> => {
  const now = new Date().toISOString();
  const docRef = rehearsalsCollection.doc();

  const rehearsalData = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  await docRef.set(rehearsalData);

  return mapRehearsal(docRef.id, rehearsalData);
};

/**
 * Gets all rehearsals from Firestore.
 * @returns A list of rehearsals.
 */
export const getAllRehearsals = async (): Promise<Rehearsal[]> => {
  const snapshot = await rehearsalsCollection.get();

  return snapshot.docs.map((doc) => mapRehearsal(doc.id, doc.data()));
};

/**
 * Gets one rehearsal by document ID.
 * @param id Rehearsal document ID.
 * @returns The matching rehearsal or null.
 */
export const getRehearsalById = async (
  id: string
): Promise<Rehearsal | null> => {
  const doc = await rehearsalsCollection.doc(id).get();

  if (!doc.exists) {
    return null;
  }

  const data = doc.data();

  if (!data) {
    return null;
  }

  return mapRehearsal(doc.id, data);
};

/**
 * Updates an existing rehearsal.
 * @param id Rehearsal document ID.
 * @param data Partial rehearsal update data.
 * @returns The updated rehearsal or null if not found.
 */
export const updateRehearsal = async (
  id: string,
  data: UpdateRehearsalInput
): Promise<Rehearsal | null> => {
  const docRef = rehearsalsCollection.doc(id);
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

  return mapRehearsal(updatedDoc.id, finalData);
};

/**
 * Deletes a rehearsal by document ID.
 * @param id Rehearsal document ID.
 * @returns True if deleted, false if not found.
 */
export const deleteRehearsal = async (id: string): Promise<boolean> => {
  const docRef = rehearsalsCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    return false;
  }

  await docRef.delete();
  return true;
};