import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/User.js";

describe("Auth Routes", () => {

  let token;

  // Clean up users before each test
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("test@example.com");
  }, 30000);

  it("should login user and return token", async () => {
    // First register the user
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "123456"
      });

    // Then login
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  }, 30000);

});