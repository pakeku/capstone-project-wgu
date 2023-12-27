module.exports = {
    testEnvironment: 'node',
    roots: ['./src'],
    testMatch: ['**/*.test.ts'],
    testPathIgnorePatterns: [
      '/node_modules/',
      '/frontend/' // Exclude frontend directory from tests
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
      '^@utils/(.*)$': '<rootDir>/src/utils/$1',
      '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
      '^@app$': '<rootDir>/src/app.ts',
      '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    },
  };
  