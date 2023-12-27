import { Connection } from 'mongoose';
import { connectToDatabase, disconnectFromDatabase, getConnection } from '@database/connection';
import dotenv from 'dotenv';

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
});