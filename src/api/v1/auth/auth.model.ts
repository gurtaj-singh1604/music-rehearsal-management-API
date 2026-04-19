export type AppRole = "admin" | "member";

export interface RegisterUserInput {
  email: string;
  password: string;
  displayName?: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  uid: string;
  email: string;
  role: AppRole;
  idToken?: string;
  refreshToken?: string;
  expiresIn?: string;
}