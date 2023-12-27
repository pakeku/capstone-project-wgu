import { connectToDatabase, disconnectFromDatabase } from '@database/connection';
import dotenv from 'dotenv';

describe('Database Connection', () => {
    beforeAll(async () => {
        dotenv.config();
    })

    afterAll(async () => {
        await disconnectFromDatabase();
    })

    it('should connect to the database', async () => {
        const success = await connectToDatabase();
        expect(success).toBe(true);
    });

    it('should disconnect from the database', async () => {
        const success = await disconnectFromDatabase();
        expect(success).toBe(true);
    });
});
