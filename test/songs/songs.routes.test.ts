import request from "supertest";
import app from "../../src/app";

jest.mock("../../src/api/v1/songs/songs.repository", () => ({
  createSong: jest.fn(),
  getAllSongs: jest.fn(),
  getSongById: jest.fn(),
  updateSong: jest.fn(),
  deleteSong: jest.fn(),
}));

import * as songsRepository from "../../src/api/v1/songs/songs.repository";

describe("Songs Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a song", async () => {
    const mockedSong = {
      id: "song123",
      title: "Summer Nights",
      artist: "Band A",
      key: "C",
      tempo: 120,
      duration: 210,
      genre: "Pop",
      status: "new",
      createdAt: "2026-04-07T18:00:00.000Z",
      updatedAt: "2026-04-07T18:00:00.000Z",
    };

    (songsRepository.createSong as jest.Mock).mockResolvedValue(mockedSong);

    const response = await request(app).post("/api/v1/songs").send({
      title: "Summer Nights",
      artist: "Band A",
      key: "C",
      tempo: 120,
      duration: 210,
      genre: "Pop",
      status: "new",
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe("song123");
  });

  it("should return validation error when creating a song with bad data", async () => {
    const response = await request(app).post("/api/v1/songs").send({
      title: "",
      artist: "Band A",
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should get all songs", async () => {
    const mockedSongs = [
      {
        id: "song123",
        title: "Summer Nights",
        artist: "Band A",
        key: "C",
        tempo: 120,
        duration: 210,
        genre: "Pop",
        status: "new",
        createdAt: "2026-04-07T18:00:00.000Z",
        updatedAt: "2026-04-07T18:00:00.000Z",
      },
    ];

    (songsRepository.getAllSongs as jest.Mock).mockResolvedValue(mockedSongs);

    const response = await request(app).get("/api/v1/songs");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
  });

  it("should get a song by id", async () => {
    const mockedSong = {
      id: "song123",
      title: "Summer Nights",
      artist: "Band A",
      key: "C",
      tempo: 120,
      duration: 210,
      genre: "Pop",
      status: "new",
      createdAt: "2026-04-07T18:00:00.000Z",
      updatedAt: "2026-04-07T18:00:00.000Z",
    };

    (songsRepository.getSongById as jest.Mock).mockResolvedValue(mockedSong);

    const response = await request(app).get("/api/v1/songs/song123");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe("song123");
  });

  it("should return 404 when song is not found", async () => {
    (songsRepository.getSongById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get("/api/v1/songs/not-found");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Song not found");
  });

  it("should update a song", async () => {
    const mockedSong = {
      id: "song123",
      title: "Summer Nights",
      artist: "Band A",
      key: "C",
      tempo: 128,
      duration: 210,
      genre: "Pop",
      status: "ready",
      createdAt: "2026-04-07T18:00:00.000Z",
      updatedAt: "2026-04-07T19:00:00.000Z",
    };

    (songsRepository.updateSong as jest.Mock).mockResolvedValue(mockedSong);

    const response = await request(app).put("/api/v1/songs/song123").send({
      tempo: 128,
      status: "ready",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.tempo).toBe(128);
    expect(response.body.data.status).toBe("ready");
  });

  it("should return validation error when updating a song with bad data", async () => {
    const response = await request(app).put("/api/v1/songs/song123").send({
      tempo: -10,
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should delete a song", async () => {
    (songsRepository.deleteSong as jest.Mock).mockResolvedValue(true);

    const response = await request(app).delete("/api/v1/songs/song123");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Song deleted successfully");
  });

  it("should return 404 when deleting a song that does not exist", async () => {
    (songsRepository.deleteSong as jest.Mock).mockResolvedValue(false);

    const response = await request(app).delete("/api/v1/songs/not-found");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Song not found");
  });
});