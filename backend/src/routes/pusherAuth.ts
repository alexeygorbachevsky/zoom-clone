import { Router } from "express";
import pusherAuth from "../controllers/pusherAuth";
import asyncWrap from "../middleware/asyncWrap";

const pusherAuthRoute = Router({ mergeParams: true });

pusherAuthRoute.post("/", asyncWrap(pusherAuth));

export default pusherAuthRoute;
