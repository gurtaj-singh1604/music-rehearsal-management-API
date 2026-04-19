jest.mock("../../src/config/firebase", () => ({
  adminAuth: {
    createUser: jest.fn(),
    setCustomUserClaims: jest.fn(),
    getUser: jest.fn(),
  },
}));

jest.mock("../../src/config/env", () => ({
  env: {
    firebaseWebApiKey: "fake-api-key",
  },
}));

import { adminAuth } from "../../src/config/firebase";
import { loginUser, registerUser } from "../../src/api/v1/auth/auth.service";

describe("Auth Service", () => {
  const mockedFetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = mockedFetch as unknown as typeof fetch;
  });

  it("should register a user and assign the member role", async () => {
    (adminAuth.createUser as jest.Mock).mockResolvedValue({
      uid: "member-user-id",
      email: "member@test.com",
    });

    (adminAuth.setCustomUserClaims as jest.Mock).mockResolvedValue(undefined);

    const result = await registerUser({
      email: "member@test.com",
      password: "test1234",
      displayName: "Member User",
    });

    expect(result.uid).toBe("member-user-id");
    expect(result.email).toBe("member@test.com");
    expect(result.role).toBe("member");
    expect(adminAuth.setCustomUserClaims).toHaveBeenCalledWith(
      "member-user-id",
      {
        role: "member",
      }
    );
  });

  it("should reject duplicate email registration", async () => {
    (adminAuth.createUser as jest.Mock).mockRejectedValue({
      code: "auth/email-already-exists",
    });

    await expect(
      registerUser({
        email: "member@test.com",
        password: "test1234",
        displayName: "Member User",
      })
    ).rejects.toMatchObject({
      message: "Email is already registered",
      statusCode: 409,
    });
  });

  it("should log in a user successfully", async () => {
    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        localId: "member-user-id",
        email: "member@test.com",
        idToken: "fake-token",
        refreshToken: "fake-refresh-token",
        expiresIn: "3600",
      }),
    });

    (adminAuth.getUser as jest.Mock).mockResolvedValue({
      uid: "member-user-id",
      email: "member@test.com",
      customClaims: {
        role: "member",
      },
    });

    const result = await loginUser({
      email: "member@test.com",
      password: "test1234",
    });

    expect(result.uid).toBe("member-user-id");
    expect(result.email).toBe("member@test.com");
    expect(result.role).toBe("member");
    expect(result.idToken).toBe("fake-token");
  });

  it("should reject invalid login credentials", async () => {
    mockedFetch.mockResolvedValue({
      ok: false,
      json: async () => ({
        error: {
          message: "INVALID_LOGIN_CREDENTIALS",
        },
      }),
    });

    await expect(
      loginUser({
        email: "member@test.com",
        password: "wrongpass",
      })
    ).rejects.toMatchObject({
      message: "Invalid email or password",
      statusCode: 401,
    });
  });

  it("should report configuration not found when email/password auth is disabled", async () => {
    mockedFetch.mockResolvedValue({
      ok: false,
      json: async () => ({
        error: {
          message: "CONFIGURATION_NOT_FOUND",
        },
      }),
    });

    await expect(
      loginUser({
        email: "member@test.com",
        password: "test1234",
      })
    ).rejects.toMatchObject({
      message: "Email/password sign-in is not enabled in Firebase Authentication",
      statusCode: 500,
    });
  });

  it("should report invalid API key errors", async () => {
    mockedFetch.mockResolvedValue({
      ok: false,
      json: async () => ({
        error: {
          message: "INVALID_API_KEY",
        },
      }),
    });

    await expect(
      loginUser({
        email: "member@test.com",
        password: "test1234",
      })
    ).rejects.toMatchObject({
      message: "Firebase Web API Key is invalid or belongs to the wrong project",
      statusCode: 500,
    });
  });
});