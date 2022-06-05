import { Express } from "express";
import authRoutes from "~Routes/auth.routes";

export const configureRoutes = (app: Express) => {
    app.use(authRoutes)
}