import { Router } from "express";
import  * as controller from "../controllers/pusher-auth/_index";
import { _asyncWrap } from "../middlewares/_asyncWrap";

export const pusherAuthRoute = Router({ mergeParams: true });

pusherAuthRoute.post("/", _asyncWrap(controller.pusherAuth));
pusherAuthRoute.post("/clearAll", _asyncWrap(controller.pusherAuthClearAll));
