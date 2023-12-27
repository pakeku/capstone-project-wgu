import express, { Express } from "express";
import { loggerMiddleware } from "@middlewares/logger";
import { notFoundRouter } from '@routes/error';
import { healthRouter } from '@routes/health';
import { compressionMiddleware } from '@middlewares/compression';
import { rateLimitMiddleware } from '@middlewares/rate-limit';
import { errorMiddleware } from '@middlewares/error';
import { helmetMiddleware } from '@middlewares/helmet';
import { jsonMiddleware } from "@middlewares/json";
import { corsMiddleware } from '@middlewares/cors';

// Initialize Express app
const app: Express = express();

/** Middlewares */
// Parse incoming JSON requests
app.use(jsonMiddleware);

// Log incoming requests
app.use(loggerMiddleware);         

// Set HTTP headers for security
app.use(helmetMiddleware());       

// Compress HTTP responses
app.use(compressionMiddleware());  

// Apply rate limiting to requests
app.use(rateLimitMiddleware());    

// Handle errors
app.use(errorMiddleware);          

// Enable CORS
app.use(corsMiddleware);            

/** Routes */
// Health-related routes
app.use(healthRouter);

/*
Ensure that the 404 route is applied last. 
Routes are matched in the order they are defined, so if the 404 route 
is defined first, it might capture other routes as an unknown route.
*/
app.use(notFoundRouter); // Handle unknown routes

export default app;
