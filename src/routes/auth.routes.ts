import express from "express";
import { getSpotifyAccessToken, refreshAccessToken } from "~Controllers/auth.controllers";

const router = express.Router();

router.post("/spotify/auth/tokens", getSpotifyAccessToken);
router.post("/spotify/token/refresh", refreshAccessToken);

export default router;