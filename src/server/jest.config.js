/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [".d.ts", ".js"],
  "collectCoverage": true,
    "coveragePathIgnorePatterns": [
      "build",
      "dist",
      "utils",
      "data",
      "testing.ts",
      "middlewares",
      "app.ts",
      "types.ts"
  ]
};