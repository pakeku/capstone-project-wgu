import { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';

const whitelist: string[] = (process.env.CORS_ALLOWED_ORIGINS || '').split(',');

const corsOptionsDelegate = (req: Request, callback: (err: Error | null, options?: CorsOptions) => void) => {
    let corsOptions: CorsOptions;
    if (whitelist.indexOf(req.header('Origin') || '') !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

// Define CORS middleware
export const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    cors(corsOptionsDelegate)(req, res, (err) => {
        if (err) {
            return next(err);
        }
        next();
    });
};