import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { cert, getApps, initializeApp, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { env } from "./env";

if (!env.firebaseServiceAccountPath) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_PATH is missing in .env");
}

const serviceAccountFullPath = resolve(env.firebaseServiceAccountPath);

if (!existsSync(serviceAccountFullPath)) {
  throw new Error(
    `Service account file not found at: ${serviceAccountFullPath}`
  );
}

const serviceAccount = JSON.parse(
  readFileSync(serviceAccountFullPath, "utf8")
) as ServiceAccount;

const firebaseApp =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount),
      });

export const db = getFirestore(firebaseApp);