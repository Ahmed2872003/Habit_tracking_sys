"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = __importDefault(require("./errors/ValidationError"));
class User {
    constructor(id, name, password, habits, joinedChallenges, userChallenge) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.habits = habits;
        this.joinedChallenges = joinedChallenges;
        this.userChallenge = userChallenge;
    }
    validate() {
        this.validateUsername(this.name);
        this.validatePassword(this.password);
    }
    validateUsername(username) {
        if (!this.name)
            throw new ValidationError_1.default("Username is required");
        if (!User.NAME_REGEX.test(this.name))
            throw new ValidationError_1.default("Name must not contain special characters");
        if (this.name.length > User.username_max_length)
            throw new ValidationError_1.default(`username length should be less than or equal ${User.username_max_length}`);
    }
    validatePassword(password) {
        if (!this.password)
            throw new ValidationError_1.default("Password is required");
        if (this.password.length < User.password_min_length)
            throw new ValidationError_1.default(`Password must be at least ${User.password_min_length} characters`);
    }
}
User.username_max_length = 25;
User.password_min_length = 8;
User.NAME_REGEX = /^[a-zA-Z0-9 ]+$/;
exports.default = User;
