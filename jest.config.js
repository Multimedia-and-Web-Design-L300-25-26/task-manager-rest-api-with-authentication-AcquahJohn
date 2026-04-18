export default {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  testTimeout: 30000,
  detectOpenHandles: false,
  forceExit: true,
  transformIgnorePatterns: [
    "node_modules/(?!(supertest)/)"
  ]
};