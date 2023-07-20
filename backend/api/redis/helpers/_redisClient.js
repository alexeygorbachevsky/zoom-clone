"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectRedis = exports.connectRedis = exports.redisClient = void 0;
const redis_1 = require("redis");
const process = __importStar(require("process"));
const _env_1 = require("../../constants/_env");
exports.redisClient = (0, redis_1.createClient)({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});
const connectRedis = async () => {
    await exports.redisClient.connect();
    if (_env_1.isDev) {
        exports.redisClient.on("connect", () => {
            console.log("Redis connected");
        });
        exports.redisClient.on("ready", () => {
            console.log("Redis ready to use");
        });
        exports.redisClient.on("end", () => {
            console.error("Redis closed connection");
        });
        exports.redisClient.on("error", error => {
            console.error("Redis error", error);
        });
    }
    return exports.redisClient;
};
exports.connectRedis = connectRedis;
const disconnectRedis = async () => {
    await exports.redisClient.disconnect();
};
exports.disconnectRedis = disconnectRedis;
