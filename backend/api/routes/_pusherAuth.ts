import { Router } from "express";
import  * as controller from "../controllers/pusher-auth/_pusherAuth";
import { _asyncWrap } from "../middlewares/_asyncWrap";

export const pusherAuthRoute = Router({ mergeParams: true });

pusherAuthRoute.post("/", _asyncWrap(controller.pusherAuth));
