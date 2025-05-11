"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const APIError_1 = __importDefault(require("../errors/APIError"));
function authMiddeware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { jwt: token } = req.cookies;
        if (!token || !token.startsWith("Bearer "))
            throw new APIError_1.default("Token error: No token provided", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        try {
            const decoded = jsonwebtoken_1.default.verify(token.split(" ")[1], `${process.env.JWT_SECRET}`);
            req.user = decoded;
            next();
        }
        catch (error) {
            throw new APIError_1.default("Token error", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
    });
}
exports.default = authMiddeware;
