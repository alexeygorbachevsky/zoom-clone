import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { _errorHandler } from "../src/middlewares/_errorHandler";
import { homeRoute } from "../src/routes/_home";
import { pusherAuthRoute } from "../src/routes/_pusherAuth";
import { handleUncaughtErrors } from "../src/helpers/_errors";

export const serverlessApp = express();
serverlessApp.use(cors());
serverlessApp.use(express.json());

serverlessApp.set("port", process.env.PORT || 5001);
serverlessApp.use(logger("dev"));

serverlessApp.use("/", homeRoute);
serverlessApp.use("/pusher/auth", pusherAuthRoute);

serverlessApp.use(_errorHandler);

handleUncaughtErrors();
