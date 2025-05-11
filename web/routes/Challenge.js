"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Challenge_1 = __importDefault(require("../../infrastructure/db/repositories/Challenge"));
const Challenge_2 = require("../../application/services/Challenge");
const Challenge_3 = __importDefault(require("../controllers/Challenge"));
class ChallengeRoutes {
    constructor() {
        this.userRepo = new Challenge_1.default();
        this.challengeService = new Challenge_2.ChallengeService(this.userRepo);
        this.challengeController = new Challenge_3.default(this.challengeService);
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/", this.challengeController.getChallenges);
    }
}
exports.default = ChallengeRoutes;
