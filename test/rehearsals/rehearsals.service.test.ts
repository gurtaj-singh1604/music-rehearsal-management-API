jest.mock("../../src/api/v1/rehearsals/rehearsals.repository", () => ({
  createRehearsal: jest.fn(),
  getAllRehearsals: jest.fn(),
  getRehearsalById: jest.fn(),
  updateRehearsal: jest.fn(),
  deleteRehearsal: jest.fn(),
}));

import * as rehearsalsRepository from "../../src/api/v1/rehearsals/rehearsals.repository";
import { getUpcomingRehearsals } from "../../src/api/v1/rehearsals/rehearsals.service";

describe("Rehearsals Service", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should return only rehearsals inside the reminder window", async () => {
    jest
      .spyOn(Date, "now")
      .mockReturnValue(new Date("2026-04-20T12:00:00.000Z").getTime());

    (rehearsalsRepository.getAllRehearsals as jest.Mock).mockResolvedValue([
      {
        id: "inside-window",
        date: "2026-04-20T18:00:00.000Z",
        location: "Studio A",
        goals: ["Practice harmonies"],
        setlistId: "setlist123",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "outside-window",
        date: "2026-04-22T18:00:00.000Z",
        location: "Studio B",
        goals: ["Practice ending"],
        setlistId: "setlist123",
        createdAt: "",
        updatedAt: "",
      },
    ]);

    const result = await getUpcomingRehearsals(24);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("inside-window");
  });

  it("should return an empty array when no rehearsals are upcoming", async () => {
    jest
      .spyOn(Date, "now")
      .mockReturnValue(new Date("2026-04-20T12:00:00.000Z").getTime());

    (rehearsalsRepository.getAllRehearsals as jest.Mock).mockResolvedValue([
      {
        id: "outside-window",
        date: "2026-04-25T18:00:00.000Z",
        location: "Studio B",
        goals: ["Practice ending"],
        setlistId: "setlist123",
        createdAt: "",
        updatedAt: "",
      },
    ]);

    const result = await getUpcomingRehearsals(24);

    expect(result).toEqual([]);
  });
});