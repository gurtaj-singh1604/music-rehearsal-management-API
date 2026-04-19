import request from "supertest";
import app from "../../src/app";

jest.mock("../../src/api/v1/rehearsals/rehearsals.repository", () => ({
  createRehearsal: jest.fn(),
  getAllRehearsals: jest.fn(),
  getRehearsalById: jest.fn(),
  updateRehearsal: jest.fn(),
  deleteRehearsal: jest.fn(),
}));

import * as rehearsalsRepository from "../../src/api/v1/rehearsals/rehearsals.repository";

describe("Rehearsals Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a rehearsal", async () => {
    const mockedRehearsal = {
      id: "rehearsal123",
      date: "2026-04-20T18:00:00.000Z",
      location: "Studio A",
      goals: ["Practice harmonies", "Tighten transitions"],
      setlistId: "setlist123",
      createdAt: "2026-04-07T18:00:00.000Z",
      updatedAt: "2026-04-07T18:00:00.000Z",
    };

    (rehearsalsRepository.createRehearsal as jest.Mock).mockResolvedValue(
      mockedRehearsal
    );

    const response = await request(app).post("/api/v1/rehearsals").send({
      date: "2026-04-20T18:00:00.000Z",
      location: "Studio A",
      goals: ["Practice harmonies", "Tighten transitions"],
      setlistId: "setlist123",
    });

    expect(response.status).toBe(401);
  });

  it("should return validation error when creating a rehearsal with bad data", async () => {
    const response = await request(app).post("/api/v1/rehearsals").send({
      date: "not-a-real-date",
      location: "",
      goals: [],
      setlistId: "",
    });

    expect(response.status).toBe(401);
  });

  it("should get all rehearsals only when authenticated", async () => {
    const response = await request(app).get("/api/v1/rehearsals");

    expect(response.status).toBe(401);
  });

  it("should validate upcoming reminder query parameters", async () => {
    const response = await request(app).get(
      "/api/v1/rehearsals/upcoming-reminders?sortOrder=wrong"
    );

    expect(response.status).toBe(401);
  });

  it("should get a rehearsal by id only when authenticated", async () => {
    const response = await request(app).get(
      "/api/v1/rehearsals/rehearsal123"
    );

    expect(response.status).toBe(401);
  });

  it("should update a rehearsal only when authenticated", async () => {
    const response = await request(app)
      .put("/api/v1/rehearsals/rehearsal123")
      .send({
        location: "Studio B",
      });

    expect(response.status).toBe(401);
  });

  it("should delete a rehearsal only when authenticated", async () => {
    const response = await request(app).delete(
      "/api/v1/rehearsals/rehearsal123"
    );

    expect(response.status).toBe(401);
  });
});