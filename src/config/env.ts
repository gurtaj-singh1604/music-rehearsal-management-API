import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const env = {
  port: process.env.PORT || "3000",
  firebaseServiceAccountPath: process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "",
};