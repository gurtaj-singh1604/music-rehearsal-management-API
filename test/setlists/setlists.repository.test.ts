const mockDocRef = {
  id: "setlist123",
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

import * as setlistsRepository from "../../src/api/v1/setlists/setlists.repository";

describe("Setlists Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCollection.doc.mockReturnValue(mockDocRef);
  });

  it("should create a setlist", async () => {
    const result = await setlistsRepository.createSetlist({
      name: "Practice Set 1",
      songIds: ["song123", "song456"],
      notes: "Warm-up rehearsal set",
    });

    expect(mockDocRef.set).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: "setlist123",
      name: "Practice Set 1",
      songIds: ["song123", "song456"],
      notes: "Warm-up rehearsal set",
    });
    expect(result.createdAt).toBeTruthy();
    expect(result.updatedAt).toBeTruthy();
  });

  it("should get all setlists", async () => {
    mockCollection.get.mockResolvedValue({
      docs: [
        {
          id: "setlist123",
          data: () => ({
            name: "Practice Set 1",
            songIds: ["song123", "song456"],
            notes: "Warm-up rehearsal set",
            createdAt: "2026-04-07T18:00:00.000Z",
            updatedAt: "2026-04-07T18:00:00.000Z",
          }),
        },
      ],
    });

    const result = await setlistsRepository.getAllSetlists();

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("setlist123");
    expect(result[0].name).toBe("Practice Set 1");
  });

  it("should return null when setlist is not found", async () => {
    mockDocRef.get.mockResolvedValue({
      exists: false,
    });

    const result = await setlistsRepository.getSetlistById("missing-id");

    expect(result).toBeNull();
  });

  it("should get a setlist by id", async () => {
    mockDocRef.get.mockResolvedValue({
      exists: true,
      id: "setlist123",
      data: () => ({
        name: "Practice Set 1",
        songIds: ["song123", "song456"],
        notes: "Warm-up rehearsal set",
        createdAt: "2026-04-07T18:00:00.000Z",
        updatedAt: "2026-04-07T18:00:00.000Z",
      }),
    });

    const result = await setlistsRepository.getSetlistById("setlist123");

    expect(result).not.toBeNull();
    expect(result?.id).toBe("setlist123");
    expect(result?.name).toBe("Practice Set 1");
  });

  it("should return null when updating a setlist that does not exist", async () => {
    mockDocRef.get.mockResolvedValue({
      exists: false,
    });

    const result = await setlistsRepository.updateSetlist("missing-id", {
      notes: "Updated notes",
    });

    expect(result).toBeNull();
  });

  it("should update a setlist", async () => {
    mockDocRef.get
      .mockResolvedValueOnce({
        exists: true,
      })
      .mockResolvedValueOnce({
        id: "setlist123",
        data: () => ({
          name: "Practice Set Updated",
          songIds: ["song123"],
          notes: "Updated notes",
          createdAt: "2026-04-07T18:00:00.000Z",
          updatedAt: "2026-04-07T19:00:00.000Z",
        }),
      });

    const result = await setlistsRepository.updateSetlist("setlist123", {
      name: "Practice Set Updated",
      notes: "Updated notes",
    });

    expect(mockDocRef.update).toHaveBeenCalled();
    expect(result).not.toBeNull();
    expect(result?.name).toBe("Practice Set Updated");
  });

  it("should return false when deleting a setlist that does not exist", async () => {
    mockDocRef.get.mockResolvedValue({
      exists: false,
    });

    const result = await setlistsRepository.deleteSetlist("missing-id");

    expect(result).toBe(false);
  });

  it("should delete a setlist", async () => {
    mockDocRef.get.mockResolvedValue({
      exists: true,
    });

    const result = await setlistsRepository.deleteSetlist("setlist123");

    expect(mockDocRef.delete).toHaveBeenCalled();
    expect(result).toBe(true);
  });
});