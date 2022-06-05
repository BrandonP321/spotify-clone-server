import type { Request, Response } from "express";

/* Type of Express route controller function */
export type RouteController<T extends { UrlParams?: {}; ReqBody?: {}; ResBody?: {} }, ResLocals>  = (
    req: Request<Partial<T["UrlParams"]>, T["ResBody"], Partial<T["ReqBody"]>, Partial<T["UrlParams"]>, {}>,
    res: Response<T["ResBody"], ResLocals>
) => Promise<any>