/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  moduleNameMapper: {
    "^expo-secure-store$": "<rootDir>/tests/stubs/empty.js",
    "^expo-auth-session$": "<rootDir>/tests/stubs/empty.js",
  },
};
