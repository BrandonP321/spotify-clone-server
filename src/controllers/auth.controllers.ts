import axios from "axios";
import { RouteController } from ".";
import qs from "qs";

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
const authorizationHeader = `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`, "utf-8").toString("base64")}`;

export const getSpotifyAccessToken: RouteController<{ ReqBody: { authCode: string; redirectURI: string } }, {}> = async (req, res) => {
    const { authCode, redirectURI } = req.body;

    if (!authCode || !redirectURI) {
        return res.json({ msg: "missing auth code or redirect uri" }).status(400).end();
    }

    const tokens = await getAccessToken(authCode, redirectURI);

    if (!tokens) {
        return res.json({ msg: "error getting access token" }).status(400).end();
    }

    res.json(tokens).end();
}

const getAccessToken = async (authCode: string, redirectUri: string) => {
    const data = {
        code: authCode,
        grant_type: "authorization_code",
        redirect_uri: redirectUri
    }

    try {
        const response = await axios.post<{ access_token: string; refresh_token: string }>("https://accounts.spotify.com/api/token",
            qs.stringify(data),
            {
                headers: {
                    Authorization: authorizationHeader,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        )

        return response?.data
    } catch (err: any) {
        console.log(err.response);
        return undefined;
    }
}

export const refreshAccessToken: RouteController<{ ReqBody: { refreshToken?: string } }, {}> = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        console.log("no refresh token");
        return res.json({ msg: "No refresh token provided in request" }).status(400).end();
    }

    try {
        const { data: { access_token } } = await getRefreshedToken(refreshToken);

        return res.json({ accessToken: access_token }).end();
    } catch (err: any) {
        console.log(err.response);
        return res.json({ msg: "Error refreshing access token" }).status(400).end();
    }
}

const getRefreshedToken = (refreshToken: string) => {
    const data = {
        grant_type: "refresh_token",
        refresh_token: refreshToken
    }

    return axios.post<{ access_token: string }>("https://accounts.spotify.com/api/token",
        qs.stringify(data),
        {
            headers: {
                Authorization: authorizationHeader,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    )
}