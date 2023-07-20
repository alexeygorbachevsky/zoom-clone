"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _index_1 = require("../../../redis/_index");
const createRoom = async () => {
    const { userId, roomId } = await (0, _index_1.createRoomRedis)();
    if (!roomId) {
        const error = new Error("Room creation error");
        error.status = 500;
        throw error;
    }
    return { userId, roomId };
};
exports.default = createRoom;
