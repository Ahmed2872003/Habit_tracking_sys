"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthenticationError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.default = AuthenticationError;
