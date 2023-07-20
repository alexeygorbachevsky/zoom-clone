"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorNotFoundHandler = exports._errorHandler = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const _errorHandler = (err, req, res, next) => {
    res
        .status(err.status || 500)
        .send({ error: err.message || "Internal Server Error" });
    next(err);
};
exports._errorHandler = _errorHandler;
const errorNotFoundHandler = (req, res, next) => {
    next((0, http_errors_1.default)(404));
};
exports.errorNotFoundHandler = errorNotFoundHandler;
