export interface Rehearsal {
  id: string;
  date: string;
  location: string;
  goals: string[];
  setlistId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRehearsalInput {
  date: string;
  location: string;
  goals: string[];
  setlistId: string;
}

export interface UpdateRehearsalInput {
  date?: string;
  location?: string;
  goals?: string[];
  setlistId?: string;
}