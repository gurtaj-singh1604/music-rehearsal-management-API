import request from "supertest";
import app from "../../src/app";

jest.mock("../../src/api/v1/setlists/setlists.repository", () => ({
  createSetlist: jest.fn(),
  getAllSetlists: jest.fn(),
  getSetlistById: jest.fn(),
  updateSetlist: jest.fn(),
  deleteSetlist: jest.fn(),
}));

import * as setlistsRepository from "../../src/api/v1/setlists/setlists.repository";

describe("Setlists Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a setlist", async () => {
    const mockedSetlist = {
      id: "setlist123",
      name: "Practice Set 1",
      songIds: ["song123"],
      notes: "Warm-up rehearsal set",
      createdAt: "2026-04-07T18:00:00.000Z",
      updatedAt: "2026-04-07T18:00:00.000Z",
    };

    (setlistsRepository.createSetlist as jest.Mock).mockResolvedValue(
      mockedSetlist
    );

    const response = await request(app).post("/api/v1/setlists").send({
      name: "Practice Set 1",
      songIds: ["song123"],
      notes: "Warm-up rehearsal set",
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe("setlist123");
  });

  it("should return validation error when creating a setlist with bad data", async () => {
    const response = await request(app).post("/api/v1/setlists").send({
      name: "",
      songIds: [],
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should get all setlists", async () => {
    const mockedSetlists = [
      {
        id: "setlist123",
        name: "Practice Set 1",
        songIds: ["song123"],
        notes: "Warm-up rehearsal set",
        createdAt: "2026-04-07T18:00:00.000Z",
        updatedAt: "2026-04-07T18:00:00.000Z",
      },
    ];

    (setlistsRepository.getAllSetlists as jest.Mock).mockResolvedValue(
      mockedSetlists
    );

    const response = await request(app).get("/api/v1/setlists");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
  });

  it("should get a setlist by id", async () => {
    const mockedSetlist = {
      id: "setlist123",
      name: "Practice Set 1",
      songIds: ["song123"],
      notes: "Warm-up rehearsal set",
      createdAt: "2026-04-07T18:00:00.000Z",
      updatedAt: "2026-04-07T18:00:00.000Z",
    };

    (setlistsRepository.getSetlistById as jest.Mock).mockResolvedValue(
      mockedSetlist
    );

    const response = await request(app).get("/api/v1/setlists/setlist123");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe("setlist123");
  });

  it("should return 404 when setlist is not found", async () => {
    (setlistsRepository.getSetlistById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get("/api/v1/setlists/not-found");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Setlist not found");
  });

  it("should update a setlist", async () => {
    const mockedSetlist = {
      id: "setlist123",
      name: "Practice Set Updated",
      songIds: ["song123"],
      notes: "Updated rehearsal order",
      createdAt: "2026-04-07T18:00:00.000Z",
      updatedAt: "2026-04-07T19:00:00.000Z",
    };

    (setlistsRepository.updateSetlist as jest.Mock).mockResolvedValue(
      mockedSetlist
    );

    const response = await request(app).put("/api/v1/setlists/setlist123").send({
      name: "Practice Set Updated",
      notes: "Updated rehearsal order",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe("Practice Set Updated");
  });

  it("should return validation error when updating a setlist with bad data", async () => {
    const response = await request(app).put("/api/v1/setlists/setlist123").send({
      name: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should delete a setlist", async () => {
    (setlistsRepository.deleteSetlist as jest.Mock).mockResolvedValue(true);

    const response = await request(app).delete("/api/v1/setlists/setlist123");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Setlist deleted successfully");
  });

  it("should return 404 when deleting a setlist that does not exist", async () => {
    (setlistsRepository.deleteSetlist as jest.Mock).mockResolvedValue(false);

    const response = await request(app).delete("/api/v1/setlists/not-found");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Setlist not found");
  });
});