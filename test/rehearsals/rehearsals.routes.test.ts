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

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe("rehearsal123");
  });

  it("should return validation error when creating a rehearsal with bad data", async () => {
    const response = await request(app).post("/api/v1/rehearsals").send({
      location: "",
      goals: [],
      setlistId: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should get all rehearsals", async () => {
    const mockedRehearsals = [
      {
        id: "rehearsal123",
        date: "2026-04-20T18:00:00.000Z",
        location: "Studio A",
        goals: ["Practice harmonies", "Tighten transitions"],
        setlistId: "setlist123",
        createdAt: "2026-04-07T18:00:00.000Z",
        updatedAt: "2026-04-07T18:00:00.000Z",
      },
    ];

    (rehearsalsRepository.getAllRehearsals as jest.Mock).mockResolvedValue(
      mockedRehearsals
    );

    const response = await request(app).get("/api/v1/rehearsals");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
  });

  it("should get a rehearsal by id", async () => {
    const mockedRehearsal = {
      id: "rehearsal123",
      date: "2026-04-20T18:00:00.000Z",
      location: "Studio A",
      goals: ["Practice harmonies", "Tighten transitions"],
      setlistId: "setlist123",
      createdAt: "2026-04-07T18:00:00.000Z",
      updatedAt: "2026-04-07T18:00:00.000Z",
    };

    (rehearsalsRepository.getRehearsalById as jest.Mock).mockResolvedValue(
      mockedRehearsal
    );

    const response = await request(app).get(
      "/api/v1/rehearsals/rehearsal123"
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe("rehearsal123");
  });

  it("should return 404 when rehearsal is not found", async () => {
    (rehearsalsRepository.getRehearsalById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get("/api/v1/rehearsals/not-found");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Rehearsal not found");
  });

  it("should update a rehearsal", async () => {
    const mockedRehearsal = {
      id: "rehearsal123",
      date: "2026-04-20T18:00:00.000Z",
      location: "Studio B",
      goals: ["Practice harmonies", "Fix ending"],
      setlistId: "setlist123",
      createdAt: "2026-04-07T18:00:00.000Z",
      updatedAt: "2026-04-07T19:00:00.000Z",
    };

    (rehearsalsRepository.updateRehearsal as jest.Mock).mockResolvedValue(
      mockedRehearsal
    );

    const response = await request(app)
      .put("/api/v1/rehearsals/rehearsal123")
      .send({
        location: "Studio B",
        goals: ["Practice harmonies", "Fix ending"],
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.location).toBe("Studio B");
  });

  it("should return validation error when updating a rehearsal with bad data", async () => {
    const response = await request(app)
      .put("/api/v1/rehearsals/rehearsal123")
      .send({
        location: "",
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should delete a rehearsal", async () => {
    (rehearsalsRepository.deleteRehearsal as jest.Mock).mockResolvedValue(true);

    const response = await request(app).delete(
      "/api/v1/rehearsals/rehearsal123"
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Rehearsal deleted successfully");
  });

  it("should return 404 when deleting a rehearsal that does not exist", async () => {
    (rehearsalsRepository.deleteRehearsal as jest.Mock).mockResolvedValue(false);

    const response = await request(app).delete("/api/v1/rehearsals/not-found");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Rehearsal not found");
  });
});