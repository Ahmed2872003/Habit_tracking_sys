"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotFound extends Error {
    constructor(message) {
        super(message);
    }
}
exports.default = NotFound;
