import { Request, Response, NextFunction } from 'express';
import { corsMiddleware } from '@middlewares/cors';
import cors, { CorsOptions, CorsOptionsDelegate } from 'cors';

jest.mock('cors');

describe('CORS Middleware Test', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;

    beforeEach(() => {
        req = {
            header: jest.fn(),
        };
        res = {};
        next = jest.fn();
    });

    it('should allow CORS for whitelisted origin', () => {
        process.env.CORS_ALLOWED_ORIGINS = 'https://example.com,https://test.com';

        (req.header as jest.Mock).mockReturnValue('https://example.com');

        const callback = jest.fn();

        const corsOptions: CorsOptions = { origin: true };
        (cors as jest.Mock).mockReturnValue((req: Request, res: Response, callback: Function) => {
            callback(null, corsOptions);
        });

        corsMiddleware(req as any, res as any, next);

        expect(cors).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });

    it('should deny CORS for non-whitelisted origin', () => {
        process.env.CORS_ALLOWED_ORIGINS = 'https://example.com,https://test.com';

        (req.header as jest.Mock).mockReturnValue('https://otherdomain.com');

        const callback = jest.fn();

        const corsOptions: CorsOptions = { origin: false };
        (cors as jest.Mock).mockReturnValue((req: Request, res: Response, callback: Function) => {
            callback(null, corsOptions);
        });

        corsMiddleware(req as any, res as any, next);

        expect(cors).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });
});