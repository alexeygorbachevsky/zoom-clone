"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pusherAuthClearAll = void 0;
const _clearRooms_1 = __importDefault(require("../../redis/clear-rooms/_clearRooms"));
const pusherAuthClearAll = async (req, res) => {
    await (0, _clearRooms_1.default)();
    res.send({ isCleared: true });
};
exports.pusherAuthClearAll = pusherAuthClearAll;
