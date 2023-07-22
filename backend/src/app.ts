import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import homeRoute from "./routes/home";
import pusherAuthRoute from "./routes/pusherAuth";
import errorHandler from "./middleware/errorHandler";
import { handleUncaughtErrors } from "./helpers/errors";

export const app = express();

app.use(cors());
app.use(express.json());

app.set("port", process.env.PORT || 5001);
app.use(logger("dev"));

app.use("/", homeRoute);
app.use("/pusher/auth", pusherAuthRoute);

app.use(errorHandler);

handleUncaughtErrors();
