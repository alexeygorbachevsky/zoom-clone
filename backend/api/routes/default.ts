import { Router } from "express";
import * as controller from "../controllers";

export const defaultRoute = Router();

defaultRoute.get("/", controller.defaultController);
