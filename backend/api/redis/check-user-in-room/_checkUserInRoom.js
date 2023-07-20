"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _index_1 = require("../_index");
const checkUserInRoom = async ({ roomId, userId }) => {
    try {
        await (0, _index_1.connectRedis)();
        const room = await _index_1.redisClient.hGet("rooms", roomId);
        if (!room) {
            throw new Error(`No room: "${roomId}" found`);
        }
        const roomMembers = JSON.parse(room);
        const userMember = roomMembers.find((member) => member === userId);
        if (!userMember) {
            throw new Error(`No user: "${userId}" found in room: "${roomId}"`);
        }
    }
    catch (err) {
        console.log("Error", err);
        throw err;
    }
    finally {
        await (0, _index_1.disconnectRedis)();
    }
};
exports.default = checkUserInRoom;
