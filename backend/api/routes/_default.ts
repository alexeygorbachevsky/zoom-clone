import { Router } from "express";
import * as controller from "../controllers/_default";

export const defaultRoute = Router();

defaultRoute.get("/", controller.defaultController);
