"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = __importDefault(require("../../core/entities/errors/ValidationError"));
const AuthenticationError_1 = __importDefault(require("../../application/errors/AuthenticationError"));
const mongoose_1 = require("mongoose");
const http_status_codes_1 = require("http-status-codes");
const APIError_1 = __importDefault(require("./APIError"));
class ErrorHandler {
    handle(err, req, res, next) {
        let status = 500;
        if (err instanceof ValidationError_1.default)
            status = http_status_codes_1.StatusCodes.BAD_REQUEST;
        if (err instanceof AuthenticationError_1.default)
            status = http_status_codes_1.StatusCodes.UNAUTHORIZED;
        if (err instanceof APIError_1.default)
            status = err.status;
        if (err instanceof mongoose_1.mongo.MongoServerError && err.code === 11000) {
            status = http_status_codes_1.StatusCodes.CONFLICT;
            const duplicateField = Object.keys(err.keyValue)[0];
            err.message = `This ${duplicateField} already exist`;
        }
        res.status(status).json({
            message: err.message || "Internal Server Error",
        });
    }
}
exports.default = ErrorHandler;
