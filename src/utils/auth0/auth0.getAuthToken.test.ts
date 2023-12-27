import { getTestToken } from '@utils/auth0'
import { envVariableCheck } from '@utils/checkEnvVariables'

import dotenv from 'dotenv';

describe('Environment Variables', () => {
    beforeAll(() => {
        // Load .env file if needed
        dotenv.config();
    });

    it('should have required environment variables', async () => {
        const requiredEnvVariables = [
            'AUTH0_M2M_TOKEN_URL',
            'AUTH0_M2M_CLIENT_ID',
            'AUTH0_M2M_CLIENT_SECRET',
            'AUTH0_M2M_AUDIENCE',
            'AUTH0_M2M_GRANT_TYPE',
        ];

        // Check if required environment variables are present before running the test
        await expect(envVariableCheck(requiredEnvVariables, () => { })).resolves.toBeUndefined();
    });

    it('should return a valid token', async () => {
        const errorMessage = 'Failed to fetch test token:';
        try {
            const token = await getTestToken();
            expect(token).toBeDefined();
        } catch (error: any) {
            expect(error).toBeDefined();
            expect(error.message).toContain(errorMessage);
        }
    });
});