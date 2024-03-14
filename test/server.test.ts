import app from "../app";
const request = require("supertest");

describe("POST /api/secrets", () => {
  describe("post a message", () => {
    // the answer should be 201 when succesfully post

    test("should respon with a 201 status code", async () => {
      const response = await request(app).post("/api/secrets").send({
        message: "Hello world",
      });
      expect(response.status).toBe(201);
    });
  });
});
//npx jest --detectOpenHandles
