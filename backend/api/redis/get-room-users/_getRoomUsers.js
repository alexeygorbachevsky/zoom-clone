"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _index_1 = require("../_index");
const clearRooms = async (roomId) => {
    let roomUsers = [];
    try {
        await (0, _index_1.connectRedis)();
        const room = await _index_1.redisClient.hGet("rooms", roomId);
        if (!room) {
            return null;
        }
        roomUsers = JSON.parse(room);
    }
    catch (err) {
        console.log("Error", err);
        throw err;
    }
    await (0, _index_1.disconnectRedis)();
    return roomUsers;
};
exports.default = clearRooms;
