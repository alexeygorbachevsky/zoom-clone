"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewRoomId = void 0;
const uuid_1 = require("uuid");
const _redisClient_1 = require("../../helpers/_redisClient");
const getNewRoomId = async () => {
    const newRoomId = (0, uuid_1.v4)();
    const isRoomExisted = await _redisClient_1.redisClient.get(newRoomId);
    if (isRoomExisted) {
        (0, exports.getNewRoomId)();
        return;
    }
    return newRoomId;
};
exports.getNewRoomId = getNewRoomId;
