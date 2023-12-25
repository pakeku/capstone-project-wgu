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
}
