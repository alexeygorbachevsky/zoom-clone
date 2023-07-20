"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _index_1 = require("../_index");
const clearRooms = async () => {
    try {
        await (0, _index_1.connectRedis)();
        await _index_1.redisClient.flushDb();
    }
    catch (err) {
        console.log("Error", err);
        throw err;
    }
    await (0, _index_1.disconnectRedis)();
    return true;
};
exports.default = clearRooms;
