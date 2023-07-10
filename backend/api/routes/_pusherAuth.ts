import { Router } from "express";
import  * as controller from "../controllers/_pusherAuthController";
import { _asyncWrap } from "../middlewares/_asyncWrap";

export const pusherAuthRoute = Router({ mergeParams: true });

pusherAuthRoute.get("/", _asyncWrap(controller.pusherAuthController));
