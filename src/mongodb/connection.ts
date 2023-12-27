import mongoose, { Connection } from 'mongoose';
import { envVariableCheck } from '@utils/checkEnvVariables';

let dbConnection: Connection | undefined = undefined;

const requiredEnvVariables = ['MONGO_DB_URI'];

export const connectToDatabase = async (): Promise<boolean> => {
    if (dbConnection) {
        return true;
    }

    try {
        await envVariableCheck(requiredEnvVariables, async () => {
            const uri = process.env.MONGO_DB_URI as string;
            dbConnection = mongoose.connection;
            await mongoose.connect(uri);
            return !!dbConnection;
        });
        return true;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        return false;
    }
};

export const disconnectFromDatabase = async (): Promise<boolean> => {
    if (!dbConnection) {
        return true;
    }

    try {
        await mongoose.disconnect();
        dbConnection = undefined;
        return true;
    } catch (error) {
        console.error('Error disconnecting from the database:', error);
        return false;
    }
};