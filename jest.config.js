/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.js"],
  coverageProvider: "v8",
  roots: [
    "<rootDir>/tests"
  ],
};

module.exports = config;