/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js']
};