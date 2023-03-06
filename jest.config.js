/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  forceExit: true,
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  testMatch: ["<rootDir>/test/index.ts", "<rootDir>/test/**/*.spec.ts"],
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  moduleFileExtensions: ["js", "ts", "d.ts"],
};
