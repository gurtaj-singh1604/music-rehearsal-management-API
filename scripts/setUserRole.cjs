/* eslint-env node */

const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const { cert, getApps, initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

dotenv.config({ quiet: true });

const [, , email, role] = process.argv;

if (!email || !role) {
  console.error(
    'Usage: node scripts/setUserRole.cjs "user@example.com" admin|member'
  );
  process.exit(1);
}

if (!["admin", "member"].includes(role)) {
  console.error('Role must be either "admin" or "member".');
  process.exit(1);
}

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!serviceAccountPath) {
  console.error("FIREBASE_SERVICE_ACCOUNT_PATH is missing in .env");
  process.exit(1);
}

const fullPath = path.resolve(serviceAccountPath);

if (!fs.existsSync(fullPath)) {
  console.error(`Service account file not found at: ${fullPath}`);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(fullPath, "utf8"));

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount),
      });

const adminAuth = getAuth(app);

const run = async () => {
  const user = await adminAuth.getUserByEmail(email);

  await adminAuth.setCustomUserClaims(user.uid, { role });

  console.log(`Role "${role}" assigned successfully to ${email}`);
  console.log("Ask the user to log in again to receive a fresh token.");
};

run().catch((error) => {
  console.error("Failed to assign role:");
  console.error(error);
  process.exit(1);
});