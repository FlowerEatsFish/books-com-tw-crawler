/** @type {import('jest').Config} */
module.exports = {
  roots: [
    "<rootDir>",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/build/",
    "<rootDir>/dist/",
  ],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/__tests__/**",
    "!<rootDir>/src/demo.ts",
    "!<rootDir>/src/**/*.d.ts",
  ],
  testMatch: [
    "<rootDir>/**/*.test.ts",
    "<rootDir>/test/**/*.ts",
  ],
  testEnvironment: "node",
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
    "node",
  ],
};
