import dotenv from "dotenv";
import express from "express";

dotenv.config();

import { createServer } from "http"
import { configureApp } from "~Middleware/appConfig";
import { configureRoutes } from "~Routes";

const PORT = process.env.PORT || "8000";

export const app = express();
const httpServer = createServer(app);

// MIDDLEWARE
configureApp(app);

// ROUTES
configureRoutes(app);

httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})