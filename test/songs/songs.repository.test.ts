const mockDocRef = {
  id: "song123",
  set: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockCollection = {
  doc: jest.fn(() => mockDocRef),
  get: jest.fn(),
};

jest.mock("../../src/config/firebase", () => ({
  db: {
    collection: jest.fn(() => mockCollection),
  },
}));

import * as songsRepository from "../../src/api/v1/songs/songs.repository";

describe("Songs Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCollection.doc.mockReturnValue(mockDocRef);
  });

  it("should create a song", async () => {
    const result = await songsRepository.createSong({
      title: "Summer Nights",
      artist: "Band A",
      key: "C",
      tempo: 120,
      duration: 210,
      genre: "Pop",
      status: "new",
    });

    expect(mockDocRef.set).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: "song123",
      title: "Summer Nights",
      artist: "Band A",
      key: "C",
      tempo: 120,
      duration: 210,
      genre: "Pop",
      status: "new",
    });
    expect(result.createdAt).toBeTruthy();
    expect(result.updatedAt).toBeTruthy();
  });

  it("should get all songs", async () => {
    mockCollection.get.mockResolvedValue({
      docs: [
        {
          id: "song123",
          data: () => ({
            title: "Summer Nights",
            artist: "Band A",
            key: "C",
            tempo: 120,
            duration: 210,
            genre: "Pop",
            status: "new",
            createdAt: "2026-04-07T18:00:00.000Z",
            updatedAt: "2026-04-07T18:00:00.000Z",
          }),
        },
      ],
    });

    const result = await songsRepository.getAllSongs();

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("song123");
    expect(result[0].title).toBe("Summer Nights");
  });

  it("should return null when song is not found", async () => {
    mockDocRef.get.mockResolvedValue({
      exists: false,
    });

    const result = await songsRepository.getSongById("missing-id");

    expect(result).toBeNull();
  });

  it("should get a song by id", async () => {
    mockDocRef.get.mockResolvedValue({
      exists: true,
      id: "song123",
      data: () => ({
        title: "Summer Nights",
        artist: "Band A",
        key: "C",
        tempo: 120,
        duration: 210,
        genre: "Pop",
        status: "new",
        createdAt: "2026-04-07T18:00:00.000Z",
        updatedAt: "2026-04-07T18:00:00.000Z",
      }),
    });

    const result = await songsRepository.getSongById("song123");

    expect(result).not.toBeNull();
    expect(result?.id).toBe("song123");
    expect(result?.title).toBe("Summer Nights");
  });

  it("should return null when updating a song that does not exist", async () => {
    mockDocRef.get.mockResolvedValue({
      exists: false,
    });

    const result = await songsRepository.updateSong("missing-id", {
      tempo: 128,
    });

    expect(result).toBeNull();
  });

  it("should update a song", async () => {
    mockDocRef.get
      .mockResolvedValueOnce({
        exists: true,
      })
      .mockResolvedValueOnce({
        id: "song123",
        data: () => ({
          title: "Summer Nights",
          artist: "Band A",
          key: "C",
          tempo: 128,
          duration: 210,
          genre: "Pop",
          status: "ready",
          createdAt: "2026-04-07T18:00:00.000Z",
          updatedAt: "2026-04-07T19:00:00.000Z",
        }),
      });

    const result = await songsRepository.updateSong("song123", {
      tempo: 128,
      status: "ready",
    });

    expect(mockDocRef.update).toHaveBeenCalled();
    expect(result).not.toBeNull();
    expect(result?.tempo).toBe(128);
    expect(result?.status).toBe("ready");
  });

  it("should return false when deleting a song that does not exist", async () => {
    mockDocRef.get.mockResolvedValue({
      exists: false,
    });

    const result = await songsRepository.deleteSong("missing-id");

    expect(result).toBe(false);
  });

  it("should delete a song", async () => {
    mockDocRef.get.mockResolvedValue({
      exists: true,
    });

    const result = await songsRepository.deleteSong("song123");

    expect(mockDocRef.delete).toHaveBeenCalled();
    expect(result).toBe(true);
  });
});