import app from "../src/presentation/SecretRoutes"; // Assuming app is your Express server instance
const request = require("supertest");

describe("POST /api/secrets", () => {
  describe("post a message", () => {
    // Handle successful creation (201)
    test("should respond with a 201 status code for successful message creation", async () => {
      const response = await request(app).post("/api/secrets").send({
        message: "Hello world",
      });
      expect(response.status).toBe(201);
    });

    test("should respond with a 404 status code if the endpoint is not found", async () => {
      const response = await request(app).post("/invalid/endpoint").send({
        message: "Hello world",
      });
      expect(response.status).toBe(404);
    });
  });
});
