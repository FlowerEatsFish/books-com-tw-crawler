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
    "!<rootDir>/src/demo.ts",
    "!<rootDir>/src/**/*.d.ts",
    "!<rootDir>/src/**/*.test.ts",
  ],
  testMatch: [
    "<rootDir>/**/*.test.ts",
    "<rootDir>/test/**/*.ts",
  ],
  testEnvironment: "node",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
  ],
};
