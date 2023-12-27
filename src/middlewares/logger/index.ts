import morgan from 'morgan';

export const loggerMiddleware = morgan('dev', {
    stream: process.stdout
});