import { Router } from "express";
import * as controller from "../controllers/home";

const homeRoute = Router();

homeRoute.get("/", controller.getHome);

export default homeRoute;
