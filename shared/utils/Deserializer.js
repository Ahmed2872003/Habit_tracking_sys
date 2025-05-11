"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Deserializer {
    static deserializer(instance) {
        return JSON.parse(JSON.stringify(instance));
    }
}
exports.default = Deserializer;
