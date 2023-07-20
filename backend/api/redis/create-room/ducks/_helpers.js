"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewRoomId = void 0;
const uuid_1 = require("uuid");
const _redisClient_1 = require("../../helpers/_redisClient");
const _getNewUserId_1 = require("../../helpers/_getNewUserId");
const getNewRoomId = async (roomId) => {
    const newRoomId = (0, uuid_1.v4)();
    if (newRoomId === roomId) {
        (0, _getNewUserId_1.getNewUserId)(newRoomId);
        return;
    }
    const isRoomExisted = await _redisClient_1.redisClient.get(newRoomId);
    if (isRoomExisted) {
        (0, exports.getNewRoomId)(newRoomId);
        return;
    }
    return newRoomId;
};
exports.getNewRoomId = getNewRoomId;
