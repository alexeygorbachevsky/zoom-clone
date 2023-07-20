"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWrap = void 0;
const asyncWrap = (fn) => (req, res, next, ...args) => {
    const fnReturn = fn(req, res, next, ...args);
    return Promise.resolve(fnReturn).catch(next);
};
exports.asyncWrap = asyncWrap;
