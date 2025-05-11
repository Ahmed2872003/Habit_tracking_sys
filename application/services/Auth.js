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
const AuthenticationError_1 = __importDefault(require("../errors/AuthenticationError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepo.createUser(user);
        });
    }
    authenticateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDoc = yield this.userRepo.getUser(user);
            if (!userDoc)
                throw new AuthenticationError_1.default(`No user found with username '${user.name}'`);
            if (!userDoc.comparePass(`${user.password}`))
                throw new AuthenticationError_1.default("Password is incorrect");
            return jsonwebtoken_1.default.sign({ id: userDoc.get("_id").toString(), name: userDoc.get("name") }, `${process.env.JWT_SECRET}`, { expiresIn: AuthService.jwt_expiry });
        });
    }
}
AuthService.jwt_expiry = 30 * 60; // 30 minutes
exports.default = AuthService;
