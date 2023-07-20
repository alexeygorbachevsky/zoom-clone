"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _index_1 = require("../_index");
const removeSocket = async ({ userId, roomId }) => {
    try {
        await (0, _index_1.connectRedis)();
        const allRooms = await _index_1.redisClient.hGetAll("rooms");
        const roomMembers = JSON.parse(allRooms[roomId]);
        const filteredMembers = roomMembers.filter((id) => id !== userId);
        if (filteredMembers.length) {
            await _index_1.redisClient.hSet("rooms", roomId, JSON.stringify(filteredMembers));
        }
        else {
            await _index_1.redisClient.hDel("rooms", roomId);
        }
    }
    catch (err) {
        console.log("Error", err);
        throw err;
    }
    await (0, _index_1.disconnectRedis)();
};
exports.default = removeSocket;
