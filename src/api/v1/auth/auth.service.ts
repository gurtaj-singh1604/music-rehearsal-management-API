import { AppError } from "../../../middleware/error.middleware";
import { env } from "../../../config/env";
import { adminAuth } from "../../../config/firebase";
import {
  AppRole,
  AuthResponse,
  LoginUserInput,
  RegisterUserInput,
} from "./auth.model";

type FirebaseSignInSuccess = {
  localId: string;
  email: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
};

type FirebaseSignInError = {
  error?: {
    message?: string;
  };
};

const mapFirebaseAuthError = (code: string): AppError => {
  switch (code) {
    case "auth/email-already-exists":
      return new AppError("Email is already registered", 409);
    case "auth/invalid-email":
      return new AppError("Invalid email address", 400);
    case "auth/invalid-password":
      return new AppError("Invalid password", 400);
    default:
      return new AppError("Authentication request failed", 500);
  }
};

const mapFirebaseLoginError = (message: string | undefined): AppError => {
  switch (message) {
    case "INVALID_LOGIN_CREDENTIALS":
    case "INVALID_PASSWORD":
    case "EMAIL_NOT_FOUND":
      return new AppError("Invalid email or password", 401);

    case "USER_DISABLED":
      return new AppError("User account is disabled", 403);

    case "CONFIGURATION_NOT_FOUND":
      return new AppError(
        "Email/password sign-in is not enabled in Firebase Authentication",
        500
      );

    case "INVALID_API_KEY":
    case "API_KEY_INVALID":
    case "PROJECT_NOT_FOUND":
      return new AppError(
        "Firebase Web API Key is invalid or belongs to the wrong project",
        500
      );

    default:
      return new AppError(
        `Login request failed: ${message ?? "Unknown Firebase auth error"}`,
        400
      );
  }
};

/**
 * Registers a new Firebase Authentication user with the default member role.
 * @param data Registration input.
 * @returns The created auth user response.
 */
export const registerUser = async (
  data: RegisterUserInput
): Promise<AuthResponse> => {
  try {
    const userRecord = await adminAuth.createUser({
      email: data.email,
      password: data.password,
      displayName: data.displayName,
    });

    await adminAuth.setCustomUserClaims(userRecord.uid, {
      role: "member" satisfies AppRole,
    });

    return {
      uid: userRecord.uid,
      email: userRecord.email ?? data.email,
      role: "member",
    };
  } catch (error: unknown) {
    const code =
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "string"
        ? error.code
        : "unknown";

    throw mapFirebaseAuthError(code);
  }
};

/**
 * Logs in an existing auth user using Firebase email/password sign-in.
 * @param data Login input.
 * @returns Auth response including Firebase ID token.
 */
export const loginUser = async (
  data: LoginUserInput
): Promise<AuthResponse> => {
  if (!env.firebaseWebApiKey) {
    throw new AppError("FIREBASE_WEB_API_KEY is missing in .env", 500);
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${env.firebaseWebApiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        returnSecureToken: true,
      }),
    }
  );

  const responseBody = (await response.json()) as
    | FirebaseSignInSuccess
    | FirebaseSignInError;

  if (!response.ok) {
    const errorMessage =
      "error" in responseBody ? responseBody.error?.message : undefined;

    throw mapFirebaseLoginError(errorMessage);
  }

  const signInResult = responseBody as FirebaseSignInSuccess;
  const userRecord = await adminAuth.getUser(signInResult.localId);

  const role = (userRecord.customClaims?.role as AppRole | undefined) ?? "member";

  return {
    uid: userRecord.uid,
    email: userRecord.email ?? data.email,
    role,
    idToken: signInResult.idToken,
    refreshToken: signInResult.refreshToken,
    expiresIn: signInResult.expiresIn,
  };
};