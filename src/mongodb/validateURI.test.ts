import { validateMongoDBAtlasURI } from '@database/validateURI';

// Jest test for validating MongoDB Atlas URI format
describe('MongoDB Atlas URI Validation', () => {
    it('should correctly validate a MongoDB Atlas URI', () => {
        // Arrange & Act
        const validURIs = [
            'mongodb+srv://username:password@cluster0.xxxxx.mongodb.net',
            'mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mydatabase', // Database name included
            'mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mydatabase?authSource=admin', // Additional query parameter]
        ];
        const invalidURIs = [
            'mongodb+srv://invalid_uri', // Missing username and password
            'mongo+srv://username:password@cluster0.xxxxx.mongodb.net', // Incorrect scheme
        ];

        // Assert
        validURIs.forEach(uri => {
            expect(validateMongoDBAtlasURI(uri)).toBe(true);
        })

        invalidURIs.forEach(uri => {
            expect(validateMongoDBAtlasURI(uri)).toBe(false);
        });
    });
});
