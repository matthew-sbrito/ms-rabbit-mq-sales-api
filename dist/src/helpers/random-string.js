"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomString = void 0;
const ALL_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const ALL_CHARACTERS_LENGTH = ALL_CHARACTERS.length;
function randomString(length = 10) {
    let result = '';
    while (result.length < length) {
        const randomNumber = Math.floor(Math.random() * ALL_CHARACTERS_LENGTH);
        result += ALL_CHARACTERS[randomNumber];
    }
    return result;
}
exports.randomString = randomString;
