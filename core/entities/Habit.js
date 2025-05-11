"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = __importDefault(require("./errors/ValidationError"));
class Habit {
    constructor(id, name, target, streak = 0, lastChecked, user) {
        this.id = id;
        this.name = name;
        this.target = target;
        this.streak = streak;
        this.lastChecked = lastChecked;
        this.user = user;
    }
    validate() {
        this.validateName();
        this.validateTarget();
        this.validateStreak();
        this.validateLastChecked();
    }
    validateName() {
        if (!this.name)
            throw new ValidationError_1.default("Name is required");
        if (this.name.length > Habit.MAX_NAME_LENGTH) {
            throw new ValidationError_1.default(`Name must not exceed ${Habit.MAX_NAME_LENGTH} characters`);
        }
        if (!Habit.NAME_REGEX.test(this.name))
            throw new ValidationError_1.default("Name must not contain special characters");
    }
    validateTarget() {
        if (this.target === undefined)
            throw new ValidationError_1.default("Target is required");
        if (!Number.isInteger(this.target)) {
            throw new ValidationError_1.default("Target must be an integer");
        }
        if (this.target <= 0) {
            throw new ValidationError_1.default("Target must be a positive number");
        }
        if (this.target < this.streak) {
            throw new ValidationError_1.default("Target must be greater than streak");
        }
    }
    validateStreak() {
        if (!Number.isInteger(this.streak)) {
            throw new ValidationError_1.default("Streak must be an integer");
        }
        if (this.streak < 0) {
            throw new ValidationError_1.default("Streak must not be negative");
        }
    }
    validateLastChecked() {
        if (!this.lastChecked)
            throw new ValidationError_1.default("LastChecked is required");
        if (isNaN(this.lastChecked.getTime()))
            throw new ValidationError_1.default("Invalid date");
    }
}
Habit.MAX_NAME_LENGTH = 60;
Habit.NAME_REGEX = /^[a-zA-Z0-9 ]+$/;
exports.default = Habit;
