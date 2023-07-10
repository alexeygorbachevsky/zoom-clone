import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { _errorHandler } from "./middlewares/_errorHandler";
import { defaultRoute } from "./routes/_default";
import { pusherAuthRoute } from "./routes/_pusherAuth";
import { connectRedis } from "./redis/_index";
import { isDev } from "./constants/_env";

// Create Express server
export const app = express();
app.use(cors());

connectRedis();

// Express configuration
app.set("port", process.env.PORT || 5001);
app.use(logger("dev"));

app.use("/", defaultRoute);
app.use("/pusher/auth", pusherAuthRoute);

app.use(_errorHandler);

process.on("unhandledRejection", (error: Error) => {
  if (isDev) {
    console.log("unhandledRejection:", error.message);
  }
  process.exit(1);
});

process.on("uncaughtException", (error: Error) => {
  if (isDev) {
    console.log("uncaughtException:", error.message);
  }
  process.exit(1);
});
