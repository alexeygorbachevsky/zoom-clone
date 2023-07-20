"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUncaughtErrors = void 0;
const _env_1 = require("../constants/_env");
const handleUncaughtErrors = () => {
    process.on("unhandledRejection", (error) => {
        if (_env_1.isDev) {
            console.log("unhandledRejection:", error.message);
        }
        process.exit(1);
    });
    process.on("uncaughtException", (error) => {
        if (_env_1.isDev) {
            console.log("uncaughtException:", error.message);
        }
        process.exit(1);
    });
};
exports.handleUncaughtErrors = handleUncaughtErrors;
