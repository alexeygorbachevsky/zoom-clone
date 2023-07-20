"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _index_1 = require("../../../redis/_index");
const joinRoom = async ({ userId, roomId }) => {
    if (!roomId) {
        const error = new Error("Room joining error. Room id is not provided by client.");
        error.status = 400;
        throw error;
    }
    const currentUserId = await (0, _index_1.joinRoomRedis)(roomId, userId);
    if (!currentUserId) {
        const error = new Error("Room joining error. Room id is not present.");
        error.status = 404;
        throw error;
    }
    return currentUserId;
};
exports.default = joinRoom;
