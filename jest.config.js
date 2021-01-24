module.exports = {
  roots: [
    "<rootDir>",
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/build/",
    "<rootDir>/dist/",
  ],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/demo.ts",
    "!<rootDir>/src/**/*.d.ts",
  ],
  testMatch: [
    "<rootDir>/test/**/*.ts",
    "<rootDir>/test/**/*.tsx",
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
