import cron from "node-cron";
import { Rehearsal } from "../api/v1/rehearsals/rehearsals.model";
import * as rehearsalsService from "../api/v1/rehearsals/rehearsals.service";
import { env } from "../config/env";

/**
 * Runs one reminder check for upcoming rehearsals.
 * @returns The upcoming rehearsals found in the reminder window.
 */
export const runRehearsalReminderCheck = async (): Promise<Rehearsal[]> => {
  const upcomingRehearsals = await rehearsalsService.getUpcomingRehearsals(
    env.reminderWindowHours
  );

  if (upcomingRehearsals.length === 0) {
    console.log(
      `[Reminder Scheduler] No rehearsals found in the next ${env.reminderWindowHours} hours.`
    );
    return [];
  }

  upcomingRehearsals.forEach((rehearsal) => {
    console.log(
      `[Reminder Scheduler] Upcoming rehearsal: ${rehearsal.location} at ${rehearsal.date} (setlistId: ${rehearsal.setlistId})`
    );
  });

  return upcomingRehearsals;
};

/**
 * Starts the node-cron scheduler for rehearsal reminders.
 */
export const startRehearsalReminderScheduler = (): void => {
  if (!env.cronEnabled) {
    console.log("[Reminder Scheduler] Cron is disabled.");
    return;
  }

  cron.schedule(env.cronSchedule, () => {
    void runRehearsalReminderCheck();
  });

  console.log(
    `[Reminder Scheduler] Running with schedule "${env.cronSchedule}" and window ${env.reminderWindowHours} hours.`
  );
};