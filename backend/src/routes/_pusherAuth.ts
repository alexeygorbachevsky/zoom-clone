import { Router } from "express";
import  * as controller from "../controllers/pusher-auth/_index";
import { asyncWrap } from "../middlewares/_asyncWrap";

export const pusherAuthRoute = Router({ mergeParams: true });

pusherAuthRoute.post("/", asyncWrap(controller.pusherAuth));

pusherAuthRoute.get("/get-room-users", asyncWrap(controller.pusherGetRoomUsers));

pusherAuthRoute.post("/remove-socket", asyncWrap(controller.pusherAuthRemoveSocket));

pusherAuthRoute.delete("/clear-all-rooms", asyncWrap(controller.pusherAuthClearAll));
