"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _index_1 = require("../_index");
const _getNewUserId_1 = require("../helpers/_getNewUserId");
const _helpers_1 = require("./ducks/_helpers");
const createRoom = async () => {
    let roomId = null;
    let userId = null;
    try {
        await (0, _index_1.connectRedis)();
        userId = await (0, _getNewUserId_1.getNewUserId)();
        roomId = await (0, _helpers_1.getNewRoomId)();
        await _index_1.redisClient.hSet("rooms", roomId, JSON.stringify([userId]));
    }
    catch (err) {
        console.log("Error", err);
        throw err;
    }
    finally {
        await (0, _index_1.disconnectRedis)();
    }
    return { userId, roomId };
};
exports.default = createRoom;
