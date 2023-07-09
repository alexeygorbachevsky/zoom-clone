import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { errorHandler } from "./middlewares";
import { defaultRoute, pusherAuthRoute } from "./routes";
import { connectRedis } from "./redis";
import { isDev } from "./constants/env";

// Create Express server
export const app = express();
app.use(cors());

connectRedis();

// Express configuration
app.set("port", process.env.PORT || 5001);
app.use(logger("dev"));

app.use("/", defaultRoute);
app.use("/pusher/auth", pusherAuthRoute);

app.use(errorHandler);

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
