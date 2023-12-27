import cors from 'cors';
import { envVariableCheck } from '@utils/checkEnvVariables';

const requiredEnvVariables: string[] = ['CORS_ALLOWED_ORIGINS'];

export const corsMiddleware = async () => {
    await envVariableCheck(requiredEnvVariables, () => {
        const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || [];

        // Return the actual cors middleware function
        return cors({
            origin: function (origin, callback) {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
        });
    });
};