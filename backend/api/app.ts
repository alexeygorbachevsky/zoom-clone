import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { _errorHandler } from "./middlewares/_errorHandler";
import { homeRoute } from "./routes/_home";
import { pusherAuthRoute } from "./routes/_pusherAuth";
import { handleUncaughtErrors } from "./helpers/_errors";

export const app = express();
app.use(cors());
app.use(express.json());

app.set("port", process.env.PORT || 5001);
app.use(logger("dev"));

app.use("/", homeRoute);
app.use("/pusher/auth", pusherAuthRoute);

app.use(_errorHandler);

handleUncaughtErrors();
