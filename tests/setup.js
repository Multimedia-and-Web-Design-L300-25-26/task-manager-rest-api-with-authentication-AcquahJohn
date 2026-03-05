import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env.test") });

// Connect to database before running tests
beforeAll(async () => {
  await connectDB();
});

// Close database connection after tests
afterAll(async () => {
  await mongoose.connection.close();
});

export default app;