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
const User_1 = __importDefault(require("../../core/entities/User"));
const http_status_codes_1 = require("http-status-codes");
class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const user = new User_1.default(undefined, username, password);
            user.validateUsername();
            user.validatePassword();
            yield this.authService.register(user);
            res.sendStatus(http_status_codes_1.StatusCodes.CREATED);
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const user = new User_1.default(undefined, username, password);
            user.validateUsername();
            user.validatePassword();
            const token = yield this.authService.authenticateUser(user);
            res.json({ token });
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.clearCookie("jwt", { path: "/" });
            res.sendStatus(http_status_codes_1.StatusCodes.OK);
        });
    }
}
AuthController.cookie_expiry = 30 * 60 * 1000; // 30 minutes
exports.default = AuthController;
