"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pusherAuthRoute = void 0;
const express_1 = require("express");
const controller = __importStar(require("../controllers/pusher-auth/_index"));
const _asyncWrap_1 = require("../middlewares/_asyncWrap");
exports.pusherAuthRoute = (0, express_1.Router)({ mergeParams: true });
exports.pusherAuthRoute.post("/", (0, _asyncWrap_1.asyncWrap)(controller.pusherAuth));
exports.pusherAuthRoute.get("/get-room-users", (0, _asyncWrap_1.asyncWrap)(controller.pusherGetRoomUsers));
exports.pusherAuthRoute.post("/remove-socket", (0, _asyncWrap_1.asyncWrap)(controller.pusherAuthRemoveSocket));
exports.pusherAuthRoute.delete("/clear-all-rooms", (0, _asyncWrap_1.asyncWrap)(controller.pusherAuthClearAll));
