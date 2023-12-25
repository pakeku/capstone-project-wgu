import { getTestToken } from './auth0.getAuthToken';
import dotenv from 'dotenv';

describe('Environment Variables', () => {
    it('should have required environment variables', async () => {
        expect(process.env.AUTH0_M2M_TOKEN_URL).toBeDefined();
        expect(process.env.AUTH0_M2M_CLIENT_ID).toBeDefined();
        expect(process.env.AUTH0_M2M_CLIENT_SECRET).toBeDefined();
        expect(process.env.AUTH0_M2M_AUDIENCE).toBeDefined();
        expect(process.env.AUTH0_M2M_GRANT_TYPE).toBeDefined();

    });

    it('should return a valid token', async () => {
        const errorMessage = 'Failed to fetch test token:'
        try {
            const token = await getTestToken();
            expect(token).toBeDefined();

        } catch (error: any) {
            expect(error).toBeDefined();
            expect(error.message).toContain(errorMessage);
        }

    });


});
