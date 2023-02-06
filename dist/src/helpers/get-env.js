"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
function getEnv(key) {
    const value = process.env[key];
    if (value)
        return value;
    throw new Error(`Env with key ${key} not found!`);
}
exports.getEnv = getEnv;
