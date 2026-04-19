import request from "supertest";

jest.mock("../../src/middleware/auth.middleware", () => ({
  verifyFirebaseToken: (
    _req: unknown,
    res: { locals: { authUser: { uid: string; email: string; role: string } } },
    next: () => void
  ) => {
    res.locals.authUser = {
      uid: "member-user-id",
      email: "member@test.com",
      role: "member",
    };
    next();
  },
  requireRole:
    () =>
    (_req: unknown, _res: unknown, next: () => void) => {
      next();
    },
}));

jest.mock("../../src/api/v1/auth/auth.service", () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn(),
}));

import app from "../../src/app";
import { AppError } from "../../src/middleware/error.middleware";
import * as authService from "../../src/api/v1/auth/auth.service";

describe("Auth Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register a user", async () => {
    (authService.registerUser as jest.Mock).mockResolvedValue({
      uid: "member-user-id",
      email: "member@test.com",
      role: "member",
    });

    const response = await request(app).post("/api/v1/auth/register").send({
      email: "member@test.com",
      password: "test1234",
      displayName: "Member User",
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.role).toBe("member");
  });

  it("should return validation error on bad register input", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      email: "not-an-email",
      password: "123",
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should return conflict when email is already registered", async () => {
    (authService.registerUser as jest.Mock).mockRejectedValue(
      new AppError("Email is already registered", 409)
    );

    const response = await request(app).post("/api/v1/auth/register").send({
      email: "member@test.com",
      password: "test1234",
      displayName: "Member User",
    });

    expect(response.status).toBe(409);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Email is already registered");
  });

  it("should log in a user", async () => {
    (authService.loginUser as jest.Mock).mockResolvedValue({
      uid: "member-user-id",
      email: "member@test.com",
      role: "member",
      idToken: "fake-token",
      refreshToken: "fake-refresh-token",
      expiresIn: "3600",
    });

    const response = await request(app).post("/api/v1/auth/login").send({
      email: "member@test.com",
      password: "test1234",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.idToken).toBe("fake-token");
  });

  it("should return validation error on bad login input", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "bad-email",
      password: "123",
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should return unauthorized for invalid login", async () => {
    (authService.loginUser as jest.Mock).mockRejectedValue(
      new AppError("Invalid email or password", 401)
    );

    const response = await request(app).post("/api/v1/auth/login").send({
      email: "member@test.com",
      password: "wrongpass",
    });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid email or password");
  });

  it("should return the current authenticated user", async () => {
    const response = await request(app).get("/api/v1/auth/me");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe("member@test.com");
    expect(response.body.data.role).toBe("member");
  });
});