import express, { Request, Response } from 'express';

export const healthRouter = express.Router();

healthRouter.all('/health', (req: Request, res: Response) => {
    res.status(200).send('OK');
});