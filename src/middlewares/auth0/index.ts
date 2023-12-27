import { auth, AuthOptions } from 'express-oauth2-jwt-bearer';
import { RequestHandler } from 'express';
import { envVariableCheck } from '@utils/checkEnvVariables';

export const checkJwt = (): RequestHandler | undefined => {
    const requiredEnvVariables: string[] = ['AUTH0_API_AUDIENCE', 'AUTH0_API_ISSUER_BASE_URL'];

    try {
        // Check if required environment variables are present
        envVariableCheck(requiredEnvVariables, () => {
            const options: AuthOptions = {
                audience: process.env.AUTH0_API_AUDIENCE as string,
                issuerBaseURL: process.env.AUTH0_API_ISSUER_BASE_URL as string,
            };

            const checkJwt: RequestHandler = auth(options);
            return checkJwt;
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Environment variables missing:', error.message);
        } else {
            console.error('An unknown error occurred:', error);
        }
        return undefined;
    }
};