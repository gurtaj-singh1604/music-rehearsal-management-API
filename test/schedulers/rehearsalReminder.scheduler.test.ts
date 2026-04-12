jest.mock("../../src/api/v1/rehearsals/rehearsals.service", () => ({
  getUpcomingRehearsals: jest.fn(),
}));

import * as rehearsalsService from "../../src/api/v1/rehearsals/rehearsals.service";
import { runRehearsalReminderCheck } from "../../src/schedulers/rehearsalReminder.scheduler";

describe("Rehearsal Reminder Scheduler", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should log upcoming rehearsals when they exist", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {
      return;
    });

    (rehearsalsService.getUpcomingRehearsals as jest.Mock).mockResolvedValue([
      {
        id: "rehearsal123",
        date: "2026-04-20T18:00:00.000Z",
        location: "Studio A",
        goals: ["Practice harmonies"],
        setlistId: "setlist123",
        createdAt: "",
        updatedAt: "",
      },
    ]);

    const result = await runRehearsalReminderCheck();

    expect(result).toHaveLength(1);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("should log that no rehearsals were found when list is empty", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {
      return;
    });

    (rehearsalsService.getUpcomingRehearsals as jest.Mock).mockResolvedValue(
      []
    );

    const result = await runRehearsalReminderCheck();

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();
  });
});