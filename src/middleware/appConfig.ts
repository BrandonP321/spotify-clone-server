/**
 * Generic middleware
 */
import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";

export const configureApp = (app: Express) => {
    app.use(helmet());

    app.use(cors({
        origin: true,
        credentials: true
    }));

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Credentials', "true")
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
        next()
    })

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
}