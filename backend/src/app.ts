import express from "express";
import logger from "morgan";

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Routes
import { index } from "./routes";
// Create Express server
export const app = express();

// Express configuration
app.set("port", process.env.PORT || 9000);

app.use(logger("dev"));

app.use("/", index);

app.use(errorNotFoundHandler);
app.use(errorHandler);
