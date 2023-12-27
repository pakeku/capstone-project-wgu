import express, { Request, Response, NextFunction } from 'express';

export const notFoundRouter = express.Router();

notFoundRouter.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error('Not Found');
    res.status(404).json({ error: err.message });
});