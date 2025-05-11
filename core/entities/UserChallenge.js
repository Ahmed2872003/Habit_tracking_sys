"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = __importDefault(require("./errors/ValidationError"));
class UserChallenge {
    constructor(user, challenge, streak = 0) {
        this.user = user;
        this.challenge = challenge;
        this.streak = streak;
    }
    validate() {
        this.validateStreak();
    }
    validateStreak() {
        if (!Number.isInteger(this.streak)) {
            throw new ValidationError_1.default("Streak must be an integer");
        }
        if (this.streak < 0) {
            throw new ValidationError_1.default("Streak must not be negative");
        }
        if (this.challenge && this.challenge.days)
            if (this.streak > this.challenge.days) {
                throw new ValidationError_1.default("Streak mustn't be greater than days");
            }
    }
}
exports.default = UserChallenge;
