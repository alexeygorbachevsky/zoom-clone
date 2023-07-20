"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pusherAuth = void 0;
const _web_rtc_1 = require("../../constants/_web-rtc");
const _index_1 = require("./helpers/_index");
const _pusher_1 = require("../../helpers/_pusher");
const _index_2 = require("../../redis/_index");
// ngrok http 5001
// taskkill /f /im ngrok.exe
const pusherAuth = async (req, res, next) => {
    const { socketId, channelName, action, roomId, userId } = req.body;
    if (channelName !== _web_rtc_1.CHANNEL) {
        next(new Error("Incorrect channel name"));
    }
    const pusher = (0, _pusher_1.getPusher)();
    let currentRoomId = roomId;
    let currentUserId = userId;
    switch (action) {
        case "create-room" /* ACTIONS.createRoom */: {
            const { roomId, userId } = await (0, _index_1.createRoom)();
            currentRoomId = roomId;
            currentUserId = userId;
            break;
        }
        case "join-room" /* ACTIONS.joinRoom */: {
            currentUserId = await (0, _index_1.joinRoom)({ userId, roomId });
            break;
        }
        default: {
            await (0, _index_2.checkUserInRoomRedis)({ roomId, userId });
        }
    }
    const authResponse = pusher.authorizeChannel(socketId, channelName, {
        user_id: currentUserId,
        user_info: {
            roomId: currentRoomId,
        },
    });
    res.send(authResponse);
};
exports.pusherAuth = pusherAuth;
