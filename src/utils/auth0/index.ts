import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const getTestToken = async (): Promise<string> => {
    const options = {
        method: 'POST',
        url: process.env.AUTH0_M2M_TOKEN_URL || '',
        headers: { 'content-type': 'application/json' },
        data: {
            client_id: process.env.AUTH0_M2M_CLIENT_ID || '',
            client_secret: process.env.AUTH0_M2M_CLIENT_SECRET || '',
            audience: process.env.AUTH0_M2M_AUDIENCE || '',
            grant_type: process.env.AUTH0_M2M_GRANT_TYPE || '',
        },
    };

    try {
        const response: AxiosResponse = await axios(options);
        return response.data.access_token;
    } catch (error) {
        throw new Error(`Failed to fetch test token, ${error}`);
    }
};