"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = __importDefault(require("crypto-js"));
class Crypto {
    static hash(value) {
        return crypto_js_1.default.SHA256(value).toString(crypto_js_1.default.enc.Hex);
    }
    static compare(value, hashedValue) {
        return hashedValue === crypto_js_1.default.SHA256(value).toString(crypto_js_1.default.enc.Hex);
    }
}
exports.default = Crypto;
