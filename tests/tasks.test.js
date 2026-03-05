import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/User.js";
import Task from "../src/models/Task.js";
import mongoose from "mongoose";

let token;
let taskId;

beforeAll(async () => {
  // Clean up existing users and tasks
  await User.deleteMany({});
  await Task.deleteMany({});

  // Register
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Task User",
      email: "task@example.com",
      password: "123456"
    });

  // Login
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "task@example.com",
      password: "123456"
    });

  token = res.body.token;
}, 30000);

afterAll(async () => {
  // Clean up after tests only if connected
  if (mongoose.connection.readyState === 1) {
    await User.deleteMany({});
    await Task.deleteMany({});
  }
});

describe("Task Routes", () => {

  it("should not allow access without token", async () => {
    const res = await request(app)
      .get("/api/tasks");

    expect(res.statusCode).toBe(401);
  }, 30000);

  it("should create a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Task",
        description: "Testing"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");

    taskId = res.body._id;
  }, 30000);

  it("should get user tasks only", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 30000);

});