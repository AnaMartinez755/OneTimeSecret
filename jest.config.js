/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  collectCoverage: true,
  coverageReporters: ["json", "html"],
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["/node_modules/"],
};
