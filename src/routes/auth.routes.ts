import { getSpotifyAccessToken, refreshAccessToken } from "../controllers/auth.controllers";
import express from "express";

const router = express.Router();

router.post("/spotify/auth/tokens", getSpotifyAccessToken);
router.post("/spotify/token/refresh", refreshAccessToken);

export default router;