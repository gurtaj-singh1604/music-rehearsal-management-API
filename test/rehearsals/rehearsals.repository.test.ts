const mockDocRef = {
  id: "rehearsal123",
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

import * as rehearsalsRepository from "../../src/api/v1/rehearsals/rehearsals.repository";

describe("Rehearsals Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCollection.doc.mockReturnValue(mockDocRef);
  });

  it("should create a rehearsal", async () => {
    const result = await rehearsalsRepository.createRehearsal({
      date: "2026-04-20T18:00:00.000Z",
      location: "Studio A",
      goals: ["Practice harmonies", "Tighten transitions"],
      setlistId: "setlist123",
    });

    expect(mockDocRef.set).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: "rehearsal123",
      date: "2026-04-20T18:00:00.000Z",
      location: "Studio A",
      goals: ["Practice harmonies", "Tighten transitions"],
      setlistId: "setlist123",
    });
    expect(result.createdAt).toBeTruthy();
    expect(result.updatedAt).toBeTruthy();
  });

  it("should get all rehearsals", async () => {
    mockCollection.get.mockResolvedValue({
      docs: [
        {
          id: "rehearsal123",
          data: () => ({
            date: "2026-04-20T18:00:00.000Z",
            location: "Studio A",
            goals: ["Practice harmonies", "Tighten transitions"],
            setlistId: "setlist123",
            createdAt: "2026-04-07T18:00:00.000Z",
            updatedAt: "2026-04-07T18:00:00.000Z",
          }),
        },
      ],
    });

    const result = await rehearsalsRepository.getAllRehearsals();

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("rehearsal123");
    expect(result[0].location).toBe("Studio A");
  });

  it("should return null when rehearsal is not found", async () => {
    mockDocRef.get.mockResolvedValue({
      exists: false,
    });

    const result = await rehearsalsRepository.getRehearsalById("missing-id");

    expect(result).toBeNull();
  });

  it("should return null when rehearsal data is missing", async () => {
    mockDocRef.get.mockResolvedValue({
      exists: true,
      id: "rehearsal123",
      data: () => undefined,
    });

    const result = await rehearsalsRepository.getRehearsalById("rehearsal123");

    expect(result).toBeNull();
  });

  it("should get a rehearsal by id", async () => {
    mockDocRef.get.mockResolvedValue({
      exists: true,
      id: "rehearsal123",
      data: () => ({
        date: "2026-04-20T18:00:00.000Z",
        location: "Studio A",
        goals: ["Practice harmonies", "Tighten transitions"],
        setlistId: "setlist123",
        createdAt: "2026-04-07T18:00:00.000Z",
        updatedAt: "2026-04-07T18:00:00.000Z",
      }),
    });

    const result = await rehearsalsRepository.getRehearsalById("rehearsal123");

    expect(result).not.toBeNull();
    expect(result?.id).toBe("rehearsal123");
    expect(result?.location).toBe("Studio A");
  });

  it("should return null when updating a rehearsal that does not exist", async () => {
    mockDocRef.get.mockResolvedValue({
      exists: false,
    });

    const result = await rehearsalsRepository.updateRehearsal("missing-id", {
      location: "Studio B",
    });

    expect(result).toBeNull();
  });

  it("should return null when updated rehearsal data is missing", async () => {
    mockDocRef.get
      .mockResolvedValueOnce({
        exists: true,
      })
      .mockResolvedValueOnce({
        id: "rehearsal123",
        data: () => undefined,
      });

    const result = await rehearsalsRepository.updateRehearsal("rehearsal123", {
      location: "Studio B",
    });

    expect(result).toBeNull();
  });

  it("should update a rehearsal", async () => {
    mockDocRef.get
      .mockResolvedValueOnce({
        exists: true,
      })
      .mockResolvedValueOnce({
        id: "rehearsal123",
        data: () => ({
          date: "2026-04-20T18:00:00.000Z",
          location: "Studio B",
          goals: ["Practice harmonies", "Fix ending"],
          setlistId: "setlist123",
          createdAt: "2026-04-07T18:00:00.000Z",
          updatedAt: "2026-04-07T19:00:00.000Z",
        }),
      });

    const result = await rehearsalsRepository.updateRehearsal("rehearsal123", {
      location: "Studio B",
    });

    expect(mockDocRef.update).toHaveBeenCalled();
    expect(result).not.toBeNull();
    expect(result?.location).toBe("Studio B");
  });

  it("should return false when deleting a rehearsal that does not exist", async () => {
    mockDocRef.get.mockResolvedValue({
      exists: false,
    });

    const result = await rehearsalsRepository.deleteRehearsal("missing-id");

    expect(result).toBe(false);
  });

  it("should delete a rehearsal", async () => {
    mockDocRef.get.mockResolvedValue({
      exists: true,
    });

    const result = await rehearsalsRepository.deleteRehearsal("rehearsal123");

    expect(mockDocRef.delete).toHaveBeenCalled();
    expect(result).toBe(true);
  });
});