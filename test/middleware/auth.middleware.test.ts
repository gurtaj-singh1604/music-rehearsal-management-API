jest.mock("../../src/config/firebase", () => ({
  adminAuth: {
    verifyIdToken: jest.fn(),
  },
}));

import { adminAuth } from "../../src/config/firebase";
import {
  requireRole,
  verifyFirebaseToken,
} from "../../src/middleware/auth.middleware";

describe("Auth Middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should verify a valid Firebase token", async () => {
    (adminAuth.verifyIdToken as jest.Mock).mockResolvedValue({
      uid: "admin-user-id",
      email: "admin@test.com",
      role: "admin",
    });

    const req = {
      headers: {
        authorization: "Bearer valid-token",
      },
    };

    const res = {
      locals: {},
    };

    const next = jest.fn();

    await verifyFirebaseToken(
      req as never,
      res as never,
      next
    );

    expect(res.locals).toEqual({
      authUser: {
        uid: "admin-user-id",
        email: "admin@test.com",
        role: "admin",
      },
    });

    expect(next).toHaveBeenCalledWith();
  });

  it("should reject an invalid Firebase token", async () => {
    (adminAuth.verifyIdToken as jest.Mock).mockRejectedValue(
      new Error("Token invalid")
    );

    const req = {
      headers: {
        authorization: "Bearer bad-token",
      },
    };

    const res = {
      locals: {},
    };

    const next = jest.fn();

    await verifyFirebaseToken(
      req as never,
      res as never,
      next
    );

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Invalid or expired authentication token",
        statusCode: 401,
      })
    );
  });

  it("should reject a missing authorization header", async () => {
    const req = {
      headers: {},
    };

    const res = {
      locals: {},
    };

    const next = jest.fn();

    await verifyFirebaseToken(
      req as never,
      res as never,
      next
    );

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Invalid or expired authentication token",
        statusCode: 401,
      })
    );
  });

  it("should allow a user with the required role", () => {
    const middleware = requireRole("admin");

    const req = {};
    const res = {
      locals: {
        authUser: {
          uid: "admin-user-id",
          email: "admin@test.com",
          role: "admin",
        },
      },
    };

    const next = jest.fn();

    middleware(req as never, res as never, next);

    expect(next).toHaveBeenCalledWith();
  });

  it("should reject a user without the required role", () => {
    const middleware = requireRole("admin");

    const req = {};
    const res = {
      locals: {
        authUser: {
          uid: "member-user-id",
          email: "member@test.com",
          role: "member",
        },
      },
    };

    const next = jest.fn();

    middleware(req as never, res as never, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "You do not have permission to access this resource",
        statusCode: 403,
      })
    );
  });

  it("should reject when no authenticated user exists in locals", () => {
    const middleware = requireRole("admin");

    const req = {};
    const res = {
      locals: {},
    };

    const next = jest.fn();

    middleware(req as never, res as never, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Authenticated user not found",
        statusCode: 401,
      })
    );
  });
});