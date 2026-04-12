import dotenv from "dotenv";

dotenv.config({ quiet: true });

const parseBoolean = (
  value: string | undefined,
  defaultValue: boolean
): boolean => {
  if (value === undefined) {
    return defaultValue;
  }

  return value.toLowerCase() === "true";
};

const parseNumber = (
  value: string | undefined,
  defaultValue: number
): number => {
  if (value === undefined) {
    return defaultValue;
  }

  const parsedValue = Number(value);

  return Number.isNaN(parsedValue) ? defaultValue : parsedValue;
};

export const env = {
  port: process.env.PORT || "3000",
  firebaseServiceAccountPath: process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "",
  cronEnabled: parseBoolean(process.env.CRON_ENABLED, true),
  reminderWindowHours: parseNumber(process.env.REMINDER_WINDOW_HOURS, 24),
  cronSchedule: process.env.CRON_SCHEDULE || "*/1 * * * *",
};