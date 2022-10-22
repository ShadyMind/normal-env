/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    '<rootDir>/test/setup.ts'
  ],
  testMatch: [
    '<rootDir>/test/index.ts',
    '<rootDir>/test/**/*.spec.ts',
  ],
  moduleFileExtensions: ['js', 'ts']
};