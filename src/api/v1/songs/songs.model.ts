export type SongStatus = "new" | "learning" | "ready";

export interface Song {
  id: string;
  title: string;
  artist: string;
  key: string;
  tempo: number;
  duration: number;
  genre: string;
  status: SongStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSongInput {
  title: string;
  artist: string;
  key: string;
  tempo: number;
  duration: number;
  genre: string;
  status: SongStatus;
}

export interface UpdateSongInput {
  title?: string;
  artist?: string;
  key?: string;
  tempo?: number;
  duration?: number;
  genre?: string;
  status?: SongStatus;
}