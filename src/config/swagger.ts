import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Music Rehearsal Management API",
      version: "1.0.0",
      description:
        "Milestone 3 API documentation for Songs, Setlists, Rehearsals, authentication, authorization, and reminder checks.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
    ],
    tags: [
      { name: "System", description: "System and health endpoints" },
      { name: "Auth", description: "Authentication endpoints" },
      { name: "Songs", description: "Songs CRUD endpoints" },
      { name: "Setlists", description: "Setlists CRUD endpoints" },
      { name: "Rehearsals", description: "Rehearsals CRUD endpoints" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        HealthResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Music Rehearsal Management API is running",
            },
          },
        },
        Song: {
          type: "object",
          properties: {
            id: { type: "string", example: "song123" },
            title: { type: "string", example: "Summer Nights" },
            artist: { type: "string", example: "Band A" },
            key: { type: "string", example: "C" },
            tempo: { type: "number", example: 120 },
            duration: { type: "number", example: 210 },
            genre: { type: "string", example: "Pop" },
            status: {
              type: "string",
              enum: ["new", "learning", "ready"],
              example: "new",
            },
            createdAt: {
              type: "string",
              example: "2026-04-07T18:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              example: "2026-04-07T18:00:00.000Z",
            },
          },
        },
        CreateSongInput: {
          type: "object",
          required: [
            "title",
            "artist",
            "key",
            "tempo",
            "duration",
            "genre",
            "status",
          ],
          properties: {
            title: { type: "string", example: "Summer Nights" },
            artist: { type: "string", example: "Band A" },
            key: { type: "string", example: "C" },
            tempo: { type: "number", example: 120 },
            duration: { type: "number", example: 210 },
            genre: { type: "string", example: "Pop" },
            status: {
              type: "string",
              enum: ["new", "learning", "ready"],
              example: "new",
            },
          },
        },
        UpdateSongInput: {
          type: "object",
          properties: {
            title: { type: "string", example: "Summer Nights" },
            artist: { type: "string", example: "Band A" },
            key: { type: "string", example: "C" },
            tempo: { type: "number", example: 128 },
            duration: { type: "number", example: 210 },
            genre: { type: "string", example: "Pop" },
            status: {
              type: "string",
              enum: ["new", "learning", "ready"],
              example: "ready",
            },
          },
        },
        Setlist: {
          type: "object",
          properties: {
            id: { type: "string", example: "setlist123" },
            name: { type: "string", example: "Practice Set 1" },
            songIds: {
              type: "array",
              items: { type: "string" },
              example: ["song123", "song456"],
            },
            notes: {
              type: "string",
              example: "Warm-up rehearsal set",
            },
            createdAt: {
              type: "string",
              example: "2026-04-07T18:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              example: "2026-04-07T18:00:00.000Z",
            },
          },
        },
        CreateSetlistInput: {
          type: "object",
          required: ["name", "songIds"],
          properties: {
            name: { type: "string", example: "Practice Set 1" },
            songIds: {
              type: "array",
              items: { type: "string" },
              example: ["song123", "song456"],
            },
            notes: {
              type: "string",
              example: "Warm-up rehearsal set",
            },
          },
        },
        UpdateSetlistInput: {
          type: "object",
          properties: {
            name: { type: "string", example: "Practice Set Updated" },
            songIds: {
              type: "array",
              items: { type: "string" },
              example: ["song123", "song456"],
            },
            notes: {
              type: "string",
              example: "Updated rehearsal order",
            },
          },
        },
        Rehearsal: {
          type: "object",
          properties: {
            id: { type: "string", example: "rehearsal123" },
            date: {
              type: "string",
              example: "2026-04-20T18:00:00.000Z",
            },
            location: { type: "string", example: "Studio A" },
            goals: {
              type: "array",
              items: { type: "string" },
              example: ["Practice harmonies", "Tighten transitions"],
            },
            setlistId: { type: "string", example: "setlist123" },
            createdAt: {
              type: "string",
              example: "2026-04-07T18:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              example: "2026-04-07T18:00:00.000Z",
            },
          },
        },
        CreateRehearsalInput: {
          type: "object",
          required: ["date", "location", "goals", "setlistId"],
          properties: {
            date: {
              type: "string",
              format: "date-time",
              example: "2026-04-20T18:00:00.000Z",
            },
            location: { type: "string", example: "Studio A" },
            goals: {
              type: "array",
              items: { type: "string" },
              example: ["Practice harmonies", "Tighten transitions"],
            },
            setlistId: { type: "string", example: "setlist123" },
          },
        },
        UpdateRehearsalInput: {
          type: "object",
          properties: {
            date: {
              type: "string",
              format: "date-time",
              example: "2026-04-20T18:00:00.000Z",
            },
            location: { type: "string", example: "Studio B" },
            goals: {
              type: "array",
              items: { type: "string" },
              example: ["Fix ending", "Practice harmonies"],
            },
            setlistId: { type: "string", example: "setlist123" },
          },
        },
        RegisterUserInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "gurtaj.member@test.com",
            },
            password: {
              type: "string",
              example: "test1234",
            },
            displayName: {
              type: "string",
              example: "Gurtaj Member",
            },
          },
        },
        LoginUserInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "gurtaj.member@test.com",
            },
            password: {
              type: "string",
              example: "test1234",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Song not found" },
          },
        },
      },
    },
    paths: {
      "/": {
        get: {
          tags: ["System"],
          summary: "Health check",
          responses: {
            "200": {
              description: "API is running",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/HealthResponse" },
                },
              },
            },
          },
        },
      },

      "/api/v1/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RegisterUserInput" },
              },
            },
          },
          responses: {
            "201": {
              description: "User registered successfully",
            },
            "400": {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "409": {
              description: "Email already registered",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      "/api/v1/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Log in a user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginUserInput" },
              },
            },
          },
          responses: {
            "200": {
              description: "Login successful",
            },
            "400": {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "401": {
              description: "Invalid email or password",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      "/api/v1/auth/me": {
        get: {
          tags: ["Auth"],
          summary: "Get the currently authenticated user",
          security: [{ bearerAuth: [] }],
          responses: {
            "200": {
              description: "Current user retrieved successfully",
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      "/api/v1/songs": {
        post: {
          tags: ["Songs"],
          summary: "Create a new song",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateSongInput" },
              },
            },
          },
          responses: {
            "201": {
              description: "Song created successfully",
            },
            "400": {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "401": {
              description: "Unauthorized",
            },
            "403": {
              description: "Forbidden",
            },
          },
        },
        get: {
          tags: ["Songs"],
          summary: "Get all songs",
          security: [{ bearerAuth: [] }],
          responses: {
            "200": {
              description: "Songs retrieved successfully",
            },
            "401": {
              description: "Unauthorized",
            },
          },
        },
      },

      "/api/v1/songs/{id}": {
        get: {
          tags: ["Songs"],
          summary: "Get a song by ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              description: "Song retrieved successfully",
            },
            "401": {
              description: "Unauthorized",
            },
            "404": {
              description: "Song not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        put: {
          tags: ["Songs"],
          summary: "Update a song by ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateSongInput" },
              },
            },
          },
          responses: {
            "200": {
              description: "Song updated successfully",
            },
            "400": {
              description: "Validation error",
            },
            "401": {
              description: "Unauthorized",
            },
            "403": {
              description: "Forbidden",
            },
            "404": {
              description: "Song not found",
            },
          },
        },
        delete: {
          tags: ["Songs"],
          summary: "Delete a song by ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              description: "Song deleted successfully",
            },
            "401": {
              description: "Unauthorized",
            },
            "403": {
              description: "Forbidden",
            },
            "404": {
              description: "Song not found",
            },
          },
        },
      },

      "/api/v1/setlists": {
        post: {
          tags: ["Setlists"],
          summary: "Create a new setlist",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateSetlistInput" },
              },
            },
          },
          responses: {
            "201": {
              description: "Setlist created successfully",
            },
            "400": {
              description: "Validation error",
            },
            "401": {
              description: "Unauthorized",
            },
            "403": {
              description: "Forbidden",
            },
          },
        },
        get: {
          tags: ["Setlists"],
          summary: "Get all setlists",
          security: [{ bearerAuth: [] }],
          responses: {
            "200": {
              description: "Setlists retrieved successfully",
            },
            "401": {
              description: "Unauthorized",
            },
          },
        },
      },

      "/api/v1/setlists/{id}": {
        get: {
          tags: ["Setlists"],
          summary: "Get a setlist by ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              description: "Setlist retrieved successfully",
            },
            "401": {
              description: "Unauthorized",
            },
            "404": {
              description: "Setlist not found",
            },
          },
        },
        put: {
          tags: ["Setlists"],
          summary: "Update a setlist by ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateSetlistInput" },
              },
            },
          },
          responses: {
            "200": {
              description: "Setlist updated successfully",
            },
            "400": {
              description: "Validation error",
            },
            "401": {
              description: "Unauthorized",
            },
            "403": {
              description: "Forbidden",
            },
            "404": {
              description: "Setlist not found",
            },
          },
        },
        delete: {
          tags: ["Setlists"],
          summary: "Delete a setlist by ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              description: "Setlist deleted successfully",
            },
            "401": {
              description: "Unauthorized",
            },
            "403": {
              description: "Forbidden",
            },
            "404": {
              description: "Setlist not found",
            },
          },
        },
      },

      "/api/v1/rehearsals": {
        post: {
          tags: ["Rehearsals"],
          summary: "Create a new rehearsal",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateRehearsalInput" },
              },
            },
          },
          responses: {
            "201": {
              description: "Rehearsal created successfully",
            },
            "400": {
              description: "Validation error",
            },
            "401": {
              description: "Unauthorized",
            },
            "403": {
              description: "Forbidden",
            },
          },
        },
        get: {
          tags: ["Rehearsals"],
          summary: "Get all rehearsals",
          security: [{ bearerAuth: [] }],
          responses: {
            "200": {
              description: "Rehearsals retrieved successfully",
            },
            "401": {
              description: "Unauthorized",
            },
          },
        },
      },

      "/api/v1/rehearsals/upcoming-reminders": {
        get: {
          tags: ["Rehearsals"],
          summary: "Get upcoming rehearsals for reminder checks",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "hoursAhead",
              in: "query",
              required: false,
              schema: {
                type: "number",
                example: 24,
              },
            },
            {
              name: "location",
              in: "query",
              required: false,
              schema: {
                type: "string",
                example: "Studio A",
              },
            },
            {
              name: "sortOrder",
              in: "query",
              required: false,
              schema: {
                type: "string",
                enum: ["asc", "desc"],
                example: "asc",
              },
            },
          ],
          responses: {
            "200": {
              description: "Upcoming rehearsals retrieved successfully",
            },
            "400": {
              description: "Invalid query parameters",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      "/api/v1/rehearsals/{id}": {
        get: {
          tags: ["Rehearsals"],
          summary: "Get a rehearsal by ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              description: "Rehearsal retrieved successfully",
            },
            "401": {
              description: "Unauthorized",
            },
            "404": {
              description: "Rehearsal not found",
            },
          },
        },
        put: {
          tags: ["Rehearsals"],
          summary: "Update a rehearsal by ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UpdateRehearsalInput",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Rehearsal updated successfully",
            },
            "400": {
              description: "Validation error",
            },
            "401": {
              description: "Unauthorized",
            },
            "403": {
              description: "Forbidden",
            },
            "404": {
              description: "Rehearsal not found",
            },
          },
        },
        delete: {
          tags: ["Rehearsals"],
          summary: "Delete a rehearsal by ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              description: "Rehearsal deleted successfully",
            },
            "401": {
              description: "Unauthorized",
            },
            "403": {
              description: "Forbidden",
            },
            "404": {
              description: "Rehearsal not found",
            },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJSDoc(options);