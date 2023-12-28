import { Connection } from 'mongoose';
import { connectToDatabase, disconnectFromDatabase, getConnection } from '@database/connection';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

describe('Database Connection', () => {
    beforeAll(async () => {
        dotenv.config();
    })

    afterAll(async () => {
        await disconnectFromDatabase();
    })

    it('should successfully establish a database connection', async () => {
        // Arrange & Act
        const success = await connectToDatabase();
        const connection = await getConnection() as Connection;

        // Assert
        expect(success).toBe(true);
        expect(connection).toBeDefined(); // type of Connection
    });

    it('should disconnect from the database without errors', async () => {
        // Arrange & Act
        const success = await disconnectFromDatabase();

        // Assert
        expect(success).toBe(true);
    });

    
    it('should handle error during connection', async () => {
        // Mocking an error-inducing situation, maybe by providing an invalid URI
        process.env.MONGO_DB_URI = 'invalid_uri';

        // Act
        const success = await connectToDatabase();

        // Assert
        expect(success).toBe(false); // Depending on how the error handling is structured
        // Add further assertions based on how your error handling works
    });

    it('should handle error during disconnection', async () => {
        // Set up: Make a connection first
        await connectToDatabase();

        // Mock an error during disconnection (force an error)
        jest.spyOn(mongoose, 'disconnect').mockRejectedValue(new Error('Fake disconnection error'));

        // Act
        const success = await disconnectFromDatabase();

        // Assert
        expect(success).toBe(false); // Depending on how the error handling is structured
        // Add further assertions based on how your error handling works
    });
});