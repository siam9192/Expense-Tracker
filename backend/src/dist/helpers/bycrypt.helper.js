"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.encrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
function encrypt(data, round = 10) {
    return bcrypt_1.default.hashSync(data, round);
}
exports.encrypt = encrypt;
function compare(data, encrypted) {
    return bcrypt_1.default.compare(data, encrypted);
}
exports.compare = compare;
