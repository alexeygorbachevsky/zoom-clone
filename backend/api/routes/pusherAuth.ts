import { Router } from "express";
import { pusherAuthController } from "../controllers";
import { asyncWrap } from "../middlewares";

export const pusherAuthRoute = Router({ mergeParams: true });

pusherAuthRoute.get("/", asyncWrap(pusherAuthController));
