import { Router } from "express";
import * as controller from "../controllers/home/_home";

export const homeRoute = Router();

homeRoute.get("/", controller.home);
