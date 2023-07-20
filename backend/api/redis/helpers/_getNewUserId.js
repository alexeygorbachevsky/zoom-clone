"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewUserId = void 0;
const uuid_1 = require("uuid");
const _redisClient_1 = require("./_redisClient");
const getNewUserId = async (userId) => {
    const newUserId = (0, uuid_1.v4)();
    if (newUserId === userId) {
        (0, exports.getNewUserId)(newUserId);
        return;
    }
    const allRooms = await _redisClient_1.redisClient.hGetAll("rooms");
    for (const roomId of Object.keys(allRooms)) {
        const roomMembers = JSON.parse(allRooms[roomId]);
        const isExisted = roomMembers.find((memberId) => memberId === newUserId);
        if (isExisted) {
            (0, exports.getNewUserId)(newUserId);
            return;
        }
    }
    return newUserId;
};
exports.getNewUserId = getNewUserId;
