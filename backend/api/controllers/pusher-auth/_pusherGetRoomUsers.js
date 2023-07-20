"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pusherGetRoomUsers = void 0;
const _getRoomUsers_1 = __importDefault(require("../../redis/get-room-users/_getRoomUsers"));
const pusherGetRoomUsers = async (req, res) => {
    console.log("req.params.roomId", req.params.roomId);
    const roomUsers = await (0, _getRoomUsers_1.default)(req.query.roomId);
    res.send(roomUsers);
};
exports.pusherGetRoomUsers = pusherGetRoomUsers;
