"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = __importDefault(require("./errors/ValidationError"));
class Challenge {
    constructor(id, name, days, registeredUsers, userChallenge) {
        this.id = id;
        this.name = name;
        this.days = days;
        this.registeredUsers = registeredUsers;
        this.userChallenge = userChallenge;
    }
    validate() {
        this.validateName();
        this.validateTarget();
    }
    validateName() {
        if (!this.name)
            throw new ValidationError_1.default("Name is required");
        if (this.name.length > Challenge.MAX_NAME_LENGTH) {
            throw new ValidationError_1.default(`Name must not exceed ${Challenge.MAX_NAME_LENGTH} characters`);
        }
        if (!Challenge.NAME_REGEX.test(this.name))
            throw new ValidationError_1.default("Name must not contain special characters");
    }
    validateTarget() {
        if (this.days === undefined)
            throw new ValidationError_1.default("Days is required");
        if (!Number.isInteger(this.days)) {
            throw new ValidationError_1.default("Days must be an integer");
        }
        if (this.days <= 0) {
            throw new ValidationError_1.default("Days must be a positive number");
        }
    }
}
Challenge.MAX_NAME_LENGTH = 60;
Challenge.NAME_REGEX = /^[a-zA-Z0-9 ]+$/;
exports.default = Challenge;
