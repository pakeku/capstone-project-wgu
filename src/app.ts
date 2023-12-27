import express, { Express } from "express";
import { loggerMiddleware } from "@middlewares/logger";
import { notFoundRouter } from '@routes/error'
import { healthRouter } from '@routes/health'
import { compressionMiddleware } from '@middlewares/compression';
import { rateLimitMiddleware } from '@middlewares/rate-limit';
import { errorMiddleware } from '@middlewares/error';
import { helmetMiddleware } from '@middlewares/helmet';
import { jsonMiddleware } from "@middlewares/json";
import { corsMiddleware } from '@middlewares/cors';

// Initialize Express app
const app: Express = express();

// Middlewares
app.use(jsonMiddleware);           // Parse incoming JSON requests
app.use(loggerMiddleware);         // Log incoming requests
app.use(helmetMiddleware());       // Set HTTP headers for security
app.use(compressionMiddleware());  // Compress HTTP responses
app.use(rateLimitMiddleware());    // Apply rate limiting to requests
app.use(errorMiddleware);          // Handle errors
app.use(corsMiddleware)            // Enable CORS

// Routes
app.use(healthRouter);              // Health-related routes

/*
Ensure that the route for /health is defined before the 404 route. 
Routes are matched in the order they are defined, so if the 404 route 
is defined first, it might capture other routes as an unknown route.
*/
app.use(notFoundRouter); // Handle unknown routes

export default app;