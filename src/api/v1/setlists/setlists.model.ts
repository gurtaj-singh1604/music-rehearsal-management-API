export interface Setlist {
  id: string;
  name: string;
  songIds: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSetlistInput {
  name: string;
  songIds: string[];
  notes?: string;
}

export interface UpdateSetlistInput {
  name?: string;
  songIds?: string[];
  notes?: string;
}