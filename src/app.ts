import express, { Express, json } from "express";
import { loggerMiddleware } from "@middlewares/logger";
import { notFoundRouter } from '@routes/error'
import { healthRouter } from '@routes/health'

const app: Express = express();

app.use(json());
app.use(loggerMiddleware);
app.use(healthRouter);

/*
Ensure that the route for /health is defined before the 404 route. 
Routes are matched in the order they are defined, so if the 404 route 
is defined first, it might capture other routes as an unknown route.
*/
app.use(notFoundRouter);

export default app;