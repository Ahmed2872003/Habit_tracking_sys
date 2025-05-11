"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = __importDefault(require("../controllers/Auth"));
const Auth_2 = __importDefault(require("../../application/services/Auth"));
const User_1 = __importDefault(require("../../infrastructure/db/repositories/User"));
const auth_1 = __importDefault(require("../../web/middleware/auth"));
class AuthRoutes {
    constructor() {
        this.userRepo = new User_1.default();
        this.authService = new Auth_2.default(this.userRepo);
        this.authController = new Auth_1.default(this.authService);
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/register", this.authController.register);
        this.router.post("/login", this.authController.login);
        this.router.post("/logout", auth_1.default, this.authController.logout);
    }
}
exports.default = AuthRoutes;
