"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pusherAuthRemoveSocket = void 0;
const _index_1 = require("../../redis/_index");
// ngrok http 5001
// taskkill /f /im ngrok.exe
const pusherAuthRemoveSocket = async (req, res) => {
    const userId = req.body.socketId;
    const roomId = req.body.roomId;
    await (0, _index_1.removeSocketRedis)({
        userId,
        roomId,
    });
    res.send({ isSocketRemoved: true });
};
exports.pusherAuthRemoveSocket = pusherAuthRemoveSocket;
